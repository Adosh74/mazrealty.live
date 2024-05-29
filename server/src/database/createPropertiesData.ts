import fs from 'fs';

const citiesIds = [
	'663520f9134893285cb91e2b',
	'663520f9134893285cb91df6',
	'663520f9134893285cb91e1a',
	'663520f9134893285cb91e19',
	'663520f9134893285cb91f03',
	'663520f9134893285cb91efc',
	'663520f9134893285cb91f2c',
	'663520f9134893285cb91e9d',
	'663520f9134893285cb91f2f',
	'663520f9134893285cb91e3a',
	'663520f9134893285cb91e51',
	'663520f9134893285cb91ed9',
	'663520f9134893285cb91e4a',
	'663520f9134893285cb91f3f',
	'663520f9134893285cb91ec1',
	'663520f9134893285cb91f65',
	'663520f9134893285cb91f04',
	'663520f9134893285cb91f40',
	'663520f9134893285cb91e9c',
	'663520f9134893285cb91e81',
	'663520f9134893285cb91e6c',
	'663520f9134893285cb91e3e',
	'663520f9134893285cb91e1b',
	'663520f9134893285cb91ef0',
	'663520f9134893285cb91f75',
	'663520f9134893285cb91f76',
	'663520f9134893285cb91f27',
	'663520f9134893285cb91e35',
	'663520f9134893285cb91df7',
	'663520f9134893285cb91e32',
	'663520f9134893285cb91eca',
	'663520f9134893285cb91df8',
	'663520f9134893285cb91efa',
	'663520f9134893285cb91f5f',
	'663520f9134893285cb91f72',
	'663520f9134893285cb91e52',
	'663520f9134893285cb91f32',
	'663520f9134893285cb91e59',
	'663520f9134893285cb91eb5',
	'663520f9134893285cb91e71',
	'663520f9134893285cb91e72',
	'663520f9134893285cb91e86',
	'663520f9134893285cb91e7b',
	'663520f9134893285cb91ede',
	'663520f9134893285cb91f60',
	'663520f9134893285cb91ece',
	'663520f9134893285cb91efb',
	'663520f9134893285cb91f39',
	'663520f9134893285cb91f62',
	'663520f9134893285cb91e43',
	'663520f9134893285cb91f0b',
	'663520f9134893285cb91f5e',
	'663520f9134893285cb91e36',
	'663520f9134893285cb91f54',
	'663520f9134893285cb91ef9',
	'663520f9134893285cb91f11',
	'663520f9134893285cb91f52',
	'663520f9134893285cb91f15',
	'663520f9134893285cb91e78',
	'663520f9134893285cb91f77',
	'663520f9134893285cb91e97',
	'663520f9134893285cb91dfc',
	'663520f9134893285cb91f18',
	'663520f9134893285cb91eb2',
	'663520f9134893285cb91eee',
	'663520f9134893285cb91e77',
	'663520f9134893285cb91f80',
	'663520f9134893285cb91f19',
	'663520f9134893285cb91ea8',
	'663520f9134893285cb91f17',
	'663520f9134893285cb91f68',
	'663520f9134893285cb91e5d',
	'663520f9134893285cb91e57',
	'663520f9134893285cb91e54',
	'663520f9134893285cb91e50',
	'663520f9134893285cb91eda',
	'663520f9134893285cb91f6d',
	'663520f9134893285cb91f61',
	'663520f9134893285cb91e6b',
	'663520f9134893285cb91ec9',
	'663520f9134893285cb91efe',
	'663520f9134893285cb91eff',
	'663520f9134893285cb91ef2',
	'663520f9134893285cb91ef3',
	'663520f9134893285cb91e05',
	'663520f9134893285cb91eef',
	'663520f9134893285cb91e34',
	'663520f9134893285cb91eb1',
	'663520f9134893285cb91f35',
	'663520f9134893285cb91e53',
	'663520f9134893285cb91f23',
	'663520f9134893285cb91e5e',
	'663520f9134893285cb91e11',
	'663520f9134893285cb91ea5',
	'663520f9134893285cb91e20',
	'663520f9134893285cb91e6d',
	'663520f9134893285cb91eeb',
	'663520f9134893285cb91f48',
	'663520f9134893285cb91edb',
	'663520f9134893285cb91ed3',
	'663520f9134893285cb91f09',
	'663520f9134893285cb91e85',
	'663520f9134893285cb91eba',
	'663520f9134893285cb91f29',
	'663520f9134893285cb91f4b',
	'663520f9134893285cb91e8b',
	'663520f9134893285cb91f0a',
	'663520f9134893285cb91ecc',
	'663520f9134893285cb91e46',
	'663520f9134893285cb91f71',
	'663520f9134893285cb91e12',
	'663520f9134893285cb91e42',
	'663520f9134893285cb91e6e',
	'663520f9134893285cb91e5f',
	'663520f9134893285cb91f47',
	'663520f9134893285cb91e22',
	'663520f9134893285cb91e67',
	'663520f9134893285cb91e2e',
	'663520f9134893285cb91e6f',
	'663520f9134893285cb91f53',
	'663520f9134893285cb91f3b',
	'663520f9134893285cb91eec',
	'663520f9134893285cb91e98',
	'663520f9134893285cb91f1b',
	'663520f9134893285cb91f7a',
	'663520f9134893285cb91e16',
	'663520f9134893285cb91f00',
	'663520f9134893285cb91ed8',
	'663520f9134893285cb91f33',
	'663520f9134893285cb91e80',
	'663520f9134893285cb91e55',
	'663520f9134893285cb91e9e',
	'663520f9134893285cb91f67',
	'663520f9134893285cb91f44',
	'663520f9134893285cb91e3d',
	'663520f9134893285cb91ef4',
	'663520f9134893285cb91e9b',
	'663520f9134893285cb91ef8',
	'663520f9134893285cb91f0d',
	'663520f9134893285cb91ed1',
	'663520f9134893285cb91f07',
	'663520f9134893285cb91e04',
	'663520f9134893285cb91f05',
	'663520f9134893285cb91f51',
	'663520f9134893285cb91ee7',
	'663520f9134893285cb91e84',
	'663520f9134893285cb91e58',
	'663520f9134893285cb91f78',
	'663520f9134893285cb91e07',
	'663520f9134893285cb91e5a',
	'663520f9134893285cb91f2d',
	'663520f9134893285cb91e93',
	'663520f9134893285cb91e00',
	'663520f9134893285cb91f31',
	'663520f9134893285cb91eb8',
	'663520f9134893285cb91e02',
	'663520f9134893285cb91e56',
	'663520f9134893285cb91ec0',
	'663520f9134893285cb91dfb',
	'663520f9134893285cb91e2a',
	'663520f9134893285cb91dfa',
	'663520f9134893285cb91dfe',
	'663520f9134893285cb91e7a',
	'663520f9134893285cb91e74',
	'663520f9134893285cb91eae',
	'663520f9134893285cb91f5c',
	'663520f9134893285cb91ead',
	'663520f9134893285cb91e08',
	'663520f9134893285cb91f30',
	'663520f9134893285cb91e49',
	'663520f9134893285cb91eea',
	'663520f9134893285cb91f1e',
	'663520f9134893285cb91f6b',
	'663520f9134893285cb91f0f',
	'663520f9134893285cb91ebd',
	'663520f9134893285cb91ea9',
	'663520f9134893285cb91eaa',
	'663520f9134893285cb91ef1',
	'663520f9134893285cb91e65',
	'663520f9134893285cb91f45',
	'663520f9134893285cb91e8d',
	'663520f9134893285cb91e13',
	'663520f9134893285cb91f7b',
	'663520f9134893285cb91e64',
	'663520f9134893285cb91e2f',
	'663520f9134893285cb91e70',
	'663520f9134893285cb91e4b',
	'663520f9134893285cb91e14',
	'663520f9134893285cb91e4d',
	'663520f9134893285cb91eb0',
	'663520f9134893285cb91e96',
	'663520f9134893285cb91f4a',
	'663520f9134893285cb91e3f',
	'663520f9134893285cb91e4c',
	'663520f9134893285cb91e31',
	'663520f9134893285cb91f2e',
	'663520f9134893285cb91e2c',
	'663520f9134893285cb91e15',
	'663520f9134893285cb91ea2',
	'663520f9134893285cb91e90',
	'663520f9134893285cb91f36',
	'663520f9134893285cb91e41',
	'663520f9134893285cb91ebc',
	'663520f9134893285cb91ea1',
	'663520f9134893285cb91f7c',
	'663520f9134893285cb91e99',
	'663520f9134893285cb91f42',
	'663520f9134893285cb91f43',
	'663520f9134893285cb91eb6',
	'663520f9134893285cb91f22',
	'663520f9134893285cb91e3b',
	'663520f9134893285cb91f25',
	'663520f9134893285cb91f34',
	'663520f9134893285cb91ee0',
	'663520f9134893285cb91ef7',
	'663520f9134893285cb91e68',
	'663520f9134893285cb91ec2',
	'663520f9134893285cb91e24',
	'663520f9134893285cb91e26',
	'663520f9134893285cb91e39',
	'663520f9134893285cb91edf',
	'663520f9134893285cb91ee4',
	'663520f9134893285cb91e47',
	'663520f9134893285cb91ea4',
	'663520f9134893285cb91ef5',
	'663520f9134893285cb91f5a',
	'663520f9134893285cb91e0a',
	'663520f9134893285cb91e0b',
	'663520f9134893285cb91ed6',
	'663520f9134893285cb91e27',
	'663520f9134893285cb91ed2',
	'663520f9134893285cb91e8e',
	'663520f9134893285cb91e9f',
	'663520f9134893285cb91e69',
	'663520f9134893285cb91f01',
	'663520f9134893285cb91f38',
	'663520f9134893285cb91e5b',
	'663520f9134893285cb91e1f',
	'663520f9134893285cb91e3c',
	'663520f9134893285cb91e37',
	'663520f9134893285cb91e7d',
	'663520f9134893285cb91e0d',
	'663520f9134893285cb91e7c',
	'663520f9134893285cb91f58',
	'663520f9134893285cb91e94',
	'663520f9134893285cb91efd',
	'663520f9134893285cb91f50',
	'663520f9134893285cb91f2a',
	'663520f9134893285cb91f49',
	'663520f9134893285cb91e1e',
	'663520f9134893285cb91e09',
	'663520f9134893285cb91e8a',
	'663520f9134893285cb91ed4',
	'663520f9134893285cb91f24',
	'663520f9134893285cb91e8c',
	'663520f9134893285cb91ed7',
	'663520f9134893285cb91e82',
	'663520f9134893285cb91ec7',
	'663520f9134893285cb91f46',
	'663520f9134893285cb91e6a',
	'663520f9134893285cb91ecf',
	'663520f9134893285cb91f28',
	'663520f9134893285cb91ed0',
	'663520f9134893285cb91e7f',
	'663520f9134893285cb91e48',
	'663520f9134893285cb91e73',
	'663520f9134893285cb91e0c',
	'663520f9134893285cb91f12',
	'663520f9134893285cb91e45',
	'663520f9134893285cb91e0e',
	'663520f9134893285cb91ee6',
	'663520f9134893285cb91ee9',
	'663520f9134893285cb91f1a',
	'663520f9134893285cb91e8f',
	'663520f9134893285cb91f66',
	'663520f9134893285cb91f6f',
	'663520f9134893285cb91f6a',
	'663520f9134893285cb91f0c',
	'663520f9134893285cb91e5c',
	'663520f9134893285cb91ef6',
	'663520f9134893285cb91e1c',
	'663520f9134893285cb91ec3',
	'663520f9134893285cb91e06',
	'663520f9134893285cb91f1c',
	'663520f9134893285cb91e1d',
	'663520f9134893285cb91f5b',
	'663520f9134893285cb91e2d',
	'663520f9134893285cb91ea7',
	'663520f9134893285cb91f64',
	'663520f9134893285cb91f5d',
	'663520f9134893285cb91f59',
	'663520f9134893285cb91e76',
	'663520f9134893285cb91e0f',
	'663520f9134893285cb91f3c',
	'663520f9134893285cb91e38',
	'663520f9134893285cb91ee3',
	'663520f9134893285cb91e21',
	'663520f9134893285cb91e44',
	'663520f9134893285cb91ee8',
	'663520f9134893285cb91f13',
	'663520f9134893285cb91f14',
	'663520f9134893285cb91f69',
	'663520f9134893285cb91ee2',
	'663520f9134893285cb91edc',
	'663520f9134893285cb91ebf',
	'663520f9134893285cb91ebe',
	'663520f9134893285cb91f4e',
	'663520f9134893285cb91f63',
	'663520f9134893285cb91f2b',
	'663520f9134893285cb91ecb',
	'663520f9134893285cb91f6c',
	'663520f9134893285cb91f02',
	'663520f9134893285cb91eb9',
	'663520f9134893285cb91f70',
	'663520f9134893285cb91ea0',
	'663520f9134893285cb91f1d',
	'663520f9134893285cb91e91',
	'663520f9134893285cb91f41',
	'663520f9134893285cb91e9a',
	'663520f9134893285cb91e25',
	'663520f9134893285cb91f4c',
	'663520f9134893285cb91e28',
	'663520f9134893285cb91ec6',
	'663520f9134893285cb91e33',
	'663520f9134893285cb91e92',
	'663520f9134893285cb91e4e',
	'663520f9134893285cb91dff',
	'663520f9134893285cb91f06',
	'663520f9134893285cb91f3e',
	'663520f9134893285cb91f56',
	'663520f9134893285cb91ed5',
	'663520f9134893285cb91ebb',
	'663520f9134893285cb91f7d',
	'663520f9134893285cb91ec8',
	'663520f9134893285cb91eb3',
	'663520f9134893285cb91e01',
	'663520f9134893285cb91e63',
	'663520f9134893285cb91e95',
	'663520f9134893285cb91f3a',
	'663520f9134893285cb91ec5',
	'663520f9134893285cb91ec4',
	'663520f9134893285cb91f6e',
	'663520f9134893285cb91e29',
	'663520f9134893285cb91e89',
	'663520f9134893285cb91ee5',
	'663520f9134893285cb91e03',
	'663520f9134893285cb91e17',
	'663520f9134893285cb91edd',
	'663520f9134893285cb91ea3',
	'663520f9134893285cb91f08',
	'663520f9134893285cb91e62',
	'663520f9134893285cb91f55',
	'663520f9134893285cb91e75',
	'663520f9134893285cb91f4f',
	'663520f9134893285cb91e79',
	'663520f9134893285cb91f4d',
	'663520f9134893285cb91e83',
	'663520f9134893285cb91f57',
	'663520f9134893285cb91e30',
	'663520f9134893285cb91e4f',
	'663520f9134893285cb91e61',
	'663520f9134893285cb91eac',
	'663520f9134893285cb91f73',
	'663520f9134893285cb91f74',
	'663520f9134893285cb91f10',
	'663520f9134893285cb91e60',
	'663520f9134893285cb91eed',
	'663520f9134893285cb91f3d',
	'663520f9134893285cb91f7f',
	'663520f9134893285cb91ecd',
	'663520f9134893285cb91e7e',
	'663520f9134893285cb91f7e',
	'663520f9134893285cb91eab',
	'663520f9134893285cb91eb4',
	'663520f9134893285cb91df9',
	'663520f9134893285cb91ee1',
	'663520f9134893285cb91e18',
	'663520f9134893285cb91e66',
	'663520f9134893285cb91ea6',
	'663520f9134893285cb91e10',
	'663520f9134893285cb91e40',
	'663520f9134893285cb91eaf',
	'663520f9134893285cb91f26',
	'663520f9134893285cb91e23',
	'663520f9134893285cb91f1f',
	'663520f9134893285cb91dfd',
	'663520f9134893285cb91eb7',
	'663520f9134893285cb91f16',
	'663520f9134893285cb91e88',
	'663520f9134893285cb91f79',
	'663520f9134893285cb91f21',
	'663520f9134893285cb91f20',
	'663520f9134893285cb91f0e',
	'663520f9134893285cb91f37',
	'663520f9134893285cb91e87',
];
const types = ['apartment', 'villa', 'office', 'shop'];
const transaction = ['sale', 'rent'];
const latLong = [
	{
		lat: '30.06263',
		long: '31.24967',
	},
	{
		lat: '31.20176',
		long: '29.91582',
	},
	{
		lat: '30.00944',
		long: '31.20861',
	},
	{
		lat: '31.26531',
		long: '32.3019',
	},
	{
		lat: '29.97371',
		long: '32.52627',
	},
	{
		lat: '25.69893',
		long: '32.6421',
	},
	{
		lat: '24.09082',
		long: '32.89942',
	},
	{
		lat: '26.16418',
		long: '32.72671',
	},
	{
		lat: '30.97063',
		log: '31.1669',
	},
	{
		lat: '27.18096',
		long: '31.18368',
	},
	{
		lat: '31.03637',
		long: '31.38069',
	},
	{
		lat: '26.55695',
		long: '31.69478',
	},
	{
		lat: '30.78847',
		long: '31.00192',
	},
	{
		lat: '29.30995',
		long: '30.8418',
	},
	{
		lat: '27.25738',
		long: '33.81291',
	},
	{
		lat: '30.58768',
		long: '31.502',
	},
	{
		lat: '30.60427',
		log: '32.27225',
	},
	{
		lat: '31.13379',
		long: '30.12969',
	},
	{
		lat: '29.84144',
		long: '31.30084',
	},
	{
		lat: '31.03408',
		long: '30.46823',
	},
];

const imagesArray = [
	'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://unsplash.com/photos/white-concrete-house-surrounded-by-trees-KtOid0FLjqU',
	'https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/2155202/pexels-photo-2155202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/276625/pexels-photo-276625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/2249055/pexels-photo-2249055.jpeg?auto=compress&cs=tinysrgb&w=400',
	'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400',
	'https://images.pexels.com/photos/2346091/pexels-photo-2346091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/24245748/pexels-photo-24245748/free-photo-of-interior-design-of-living-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/7166561/pexels-photo-7166561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/7195599/pexels-photo-7195599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/7018399/pexels-photo-7018399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/7147290/pexels-photo-7147290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/2041003/pexels-photo-2041003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/6207947/pexels-photo-6207947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/6207945/pexels-photo-6207945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/6238608/pexels-photo-6238608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/6758771/pexels-photo-6758771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/7005272/pexels-photo-7005272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/6758521/pexels-photo-6758521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	'https://images.pexels.com/photos/5570226/pexels-photo-5570226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];
const contract = 'https://drive.google.com/file/d/1AMFbDgBv7ecmVn4zdpZZMvkJmp2gJ1ql/view';
/* {
	owner: "662aa962cf52dc2cdceec751",
	city: "one of the cities ids",
	images: array of images urls,
	bedrooms: number less than 5, 
	bathrooms: number less than 10,
	type: "one of type array",
	transaction: "one of transaction array",
	Furnished: "true or false",
	level: number less than 10,
	name: "name for "type"",
	price: number less than 7000000,
	address: '10 st, cairo, egypt',
	latitude: 'from latLong array',
	longitude: 'same element for object in latLong array',
	area: number from 50 to 2000,
	contract: 'url for contract',
	description: '<h1>asdasd </h1><p><u>asdasd</u></p>',
}
*/

// create 10k properties for testing with above data
const createPropertiesData = async () => {
	const properties = [];
	for (let i = 0; i < 20000; i++) {
		// for loop select random 5 images from imagesArray and push in temp array
		const tempImages: string[] = [];
		for (let j = 0; j < 5; j++) {
			tempImages.push(imagesArray[Math.floor(Math.random() * imagesArray.length)]);
		}
		const randomForLatLong = Math.floor(Math.random() * latLong.length);
		const randomBedrooms = Math.floor(Math.random() * 10);
		const randomBathrooms = Math.floor(Math.random() * 5);
		const randomTypes = Math.floor(Math.random() * types.length);
		const property = {
			owner: { _id: '662aa962cf52dc2cdceec751' },
			city: { _id: citiesIds[Math.floor(Math.random() * citiesIds.length)] },
			images: tempImages,
			bedrooms: randomBedrooms,
			bathrooms: randomBathrooms,
			type: types[randomTypes],
			transaction: transaction[Math.floor(Math.random() * transaction.length)],
			Furnished: Math.random() >= 0.5,
			level: Math.floor(Math.random() * 10),
			name: `property ${i}`,
			price: Math.floor(Math.random() * 7000000),
			address: '10 st, cairo, egypt',
			latitude: latLong[randomForLatLong].lat,
			longitude: latLong[randomForLatLong].long,
			area: Math.floor(Math.random() * 2000) + 50,
			contract: contract,
			// property description using html tags
			description: `
			<h1>property ${i}</h1>
			<p>amazing property in the heart of city</p>
			<p>bedrooms: ${randomBedrooms}</p>
			<p>bathrooms: ${randomBathrooms}</p>
			`,
		};
		properties.push(property);
	}
	// await Property.insertMany(properties);
	// save properties in properties.json file
	fs.writeFileSync(`${process.cwd()}/data/properties.json`, JSON.stringify(properties));
};

createPropertiesData();