/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document } from 'mongoose';
import { client } from '../database/redis';

// ** Overwrite the default mongoose exec function
declare module 'mongoose' {
	interface Query<ResultType, DocType, THelpers, RawDocType = DocType> {
		useCache: boolean;
		hashKey: string;
		cache(options?: { key?: string }): this;
	}
}

const exec: typeof mongoose.Query.prototype.exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || '');
	return this;
};

mongoose.Query.prototype.exec = async function <T extends Document>(): Promise<T[]> {
	if (!this.useCache) {
		return exec.call(this);
	}

	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.model.collection.name,
		})
	);

	// +[1] see if we have a value for 'key' in redis
	const cacheValue = await client.hget(this.hashKey, key);

	// +[2] if we do, return that
	if (cacheValue) {
		const doc = JSON.parse(cacheValue);
		return Array.isArray(doc)
			? doc.map((d: any) => new this.model(d))
			: [new this.model(doc)];
	}
	// +[3] otherwise, issue the query and store the result in redis

	const result = await exec.call(this);
	await client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 1000);

	return result;
};

export const clearHash = (hashKey: string): void => {
	client.del(JSON.stringify(hashKey));
};
