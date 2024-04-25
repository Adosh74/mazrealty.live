import cheerio from 'cheerio';
import fs from 'fs';
import request from 'request';

const url = 'https://www.bayut.eg/en/egypt/properties-for-sale/';

(async () => {
	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);
			const data: any = [];

			// $('div[class="bbfbe3d2 be03f78f"]').each((i, el) => {
			// 	const title = $(el).find('.card__title').text();
			// 	const price = $(el).find('.card__price').text();
			// 	const location = $(el).find('.card__location').text();
			// 	const link = $(el).find('.card__link').attr('href');
			// 	data.push({
			// 		title,
			// 		price,
			// 		location,
			// 		link,
			// 	});
			// });
			// console.log(data);
			$('div[class="bbfbe3d2 be03f78f"] > ul > li').each((i, el) => {
				// want save "addressRegion", "addressLocality", images as array of links and"type" from data that in output

				const type = $(el).find('script[type="application/ld+json"]').text();

				const title = $(el).find('h2').text();
				const price = $(el).find('span').text();
				const location = $(el).find('p').text();
				const link = $(el).find('a').attr('href');

				data.push({
					type,
					title,
					price,
					location,
					link,
				});
			});
			// save it for json file
			fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log('File has been created');
			});
		}
	});
})();

// this is the output of the code
/*
{"@context":"https://schema.org","@type":"Apartment","name":"Apartment for sale on S
uez Road with only 5% down payment and 8 year installments","url":"https://www.bayut
.eg/en/property/details-500604671.html","geo":{"@type":"GeoCoordinates","latitude":3
0.08435,"longitude":31.5414973},"floorSize":{"@type":"QuantitativeValue","value":"17
2","unitText":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)
","value":"3"},"numberOfBathroomsTotal":"3","image":"https://bayut-eg-production.s3.
amazonaws.com/thumbnails/15869078-400x300.jpeg","address":{"@type":"PostalAddress","
addressCountry":"Egypt","addressRegion":"Cairo","addressLocality":"New Cairo"}}EGP7,
369,000Apartment33Area:172 Sq. M.Apartment for sale on Suez Road with only 5% down p
ayment and 8 year installmentsOrla Residence, New Cairo, Cairo Call  Email {"@contex
t":"https://schema.org","@type":"Residence","name":"Penthouse next to the American U
niversity in 90 Avenue Compound, with installments over 6 years","url":"https://www.
bayut.eg/en/property/details-500604669.html","geo":{"@type":"GeoCoordinates","latitu
de":30.0246926,"longitude":31.4940262},"floorSize":{"@type":"QuantitativeValue","val
ue":"173","unitText":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bed
room(s)","value":"3"},"numberOfBathroomsTotal":"3","image":"https://bayut-eg-product
ion.s3.amazonaws.com/thumbnails/15869060-400x300.jpeg","address":{"@type":"PostalAdd
ress","addressCountry":"Egypt","addressRegion":"Cairo","addressLocality":"New Cairo"
}}EGP18,701,000Penthouse33Area:173 Sq. M.Penthouse next to the American University i
n 90 Avenue Compound, with installments over 6 years90 Avenue, New Cairo, Cairo Call
  Email {"@context":"https://schema.org","@type":"Apartment","name":"Apartment in a
prime location ,Ready to move , in the New Capital","url":"https://www.bayut.eg/en/p
roperty/details-500604667.html","geo":{"@type":"GeoCoordinates","latitude":29.943710
3,"longitude":31.7072124},"floorSize":{"@type":"QuantitativeValue","value":"125","un
itText":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","val
ue":"2"},"numberOfBathroomsTotal":"2","image":"https://bayut-eg-production.s3.amazon
aws.com/thumbnails/15869049-400x300.jpeg","address":{"@type":"PostalAddress","addres
sCountry":"Egypt","addressRegion":"Cairo","addressLocality":"New Capital City"}}EGP6
,250,000Apartment22Area:125 Sq. M.Apartment in a prime location ,Ready to move , in
the New CapitalOIA, New Capital City, Cairo Call  Email {"@context":"https://schema.
org","@type":"Residence","name":"Duplex in ION in New Capital Compound with 10% down
 payment","url":"https://www.bayut.eg/en/property/details-500604663.html","geo":{"@t
ype":"GeoCoordinates","latitude":30.02834,"longitude":31.83725},"floorSize":{"@type"
:"QuantitativeValue","value":"256","unitText":"SQM"},"numberOfRooms":{"@type":"Quant
itativeValue","name":"Bedroom(s)","value":"4"},"numberOfBathroomsTotal":"4","image":
"https://bayut-eg-production.s3.amazonaws.com/thumbnails/15869017-400x300.jpeg","add
ress":{"@type":"PostalAddress","addressCountry":"Egypt","addressRegion":"Cairo","add
ressLocality":"New Capital City"}}EGP8,550,000Duplex44Area:256 Sq. M.Duplex in ION i
n New Capital Compound with 10% down paymentNew Capital City, Cairo Call  Email {"@c
ontext":"https://schema.org","@type":"Residence","name":"Chalet With Garden  for sal
e in Solare - view on the sea and lagoon - Misr Italia Real Estate Development Compa
ny -5% down payment - fully finished","url":"https://www.bayut.eg/en/property/detail
s-500604581.html","geo":{"@type":"GeoCoordinates","latitude":31.085864,"longitude":2
8.047712},"floorSize":{"@type":"QuantitativeValue","value":"110","unitText":"SQM"},"
numberOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"2"},"number
OfBathroomsTotal":"2","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnai
ls/15868658-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt
","addressRegion":"Matruh","addressLocality":"North Coast"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868658-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868658-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Chalet for Sale in North Coast, Matruh
 - 4. png
                                title=2 Bedroom Chalet for Sale in North Coast, Matr
uh - 4. png
                                aria-label="Fallback listing photo"
                            />
                        EGP10,700,000Chalet22Area:110 Sq. M.Chalet With Garden  for
sale in Solare - view on the sea and lagoon - Misr Italia Real Estate Development Co
mpany -5% down payment - fully finishedSOLARE, North Coast, Matruh Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407348-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407348-240x180.jpeg
                                class=_062617f4
                                alt=Capital Agency
                                title=Capital Agency
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Apartment for sale in the New Administrative Capital - New Cairo - Al Maqsad Compou
nd (R3) - 5% - 10% down payment","url":"https://www.bayut.eg/en/property/details-500
604525.html","geo":{"@type":"GeoCoordinates","latitude":30.0395901,"longitude":31.69
85965},"floorSize":{"@type":"QuantitativeValue","value":"158","unitText":"SQM"},"num
berOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"2"},"numberOfB
athroomsTotal":"3","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/
15868375-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt","
addressRegion":"Cairo","addressLocality":"New Capital City"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868375-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868375-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Flat for Sale in New Capital City, Cai
ro - WhatsApp Image 2024-03-12 at 8.41. 31 PM (1). jpeg
                                title=2 Bedroom Flat for Sale in New Capital City, C
airo - WhatsApp Image 2024-03-12 at 8.41. 31 PM (1). jpeg
                                aria-label="Fallback listing photo"
                            />
                        EGP3,954,000Apartment23Area:158 Sq. M.Apartment for sale in
the New Administrative Capital - New Cairo - Al Maqsad Compound (R3) - 5% - 10% down
 paymentAl Maqsad, New Capital City, Cairo Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15694408-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15694408-240x180.jpeg
                                class=_062617f4
                                alt=Patria Real Estate
                                title=Patria Real Estate
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Apartment for sale in the New Administrative Capital - New Cairo - Al Maqsad Compou
nd (R3) - 5% - 10% down payment","url":"https://www.bayut.eg/en/property/details-500
604520.html","geo":{"@type":"GeoCoordinates","latitude":30.0395901,"longitude":31.69
85965},"floorSize":{"@type":"QuantitativeValue","value":"157","unitText":"SQM"},"num
berOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"3"},"numberOfB
athroomsTotal":"4","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/
15868329-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt","
addressRegion":"Cairo","addressLocality":"New Capital City"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868329-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868329-400x300.jpeg
                                class=b798ac26
                                alt=3 Bedroom Apartment for Sale in New Capital City
, Cairo - WhatsApp Image 2024-03-12 at 8.41. 33 PM (4). jpeg
                                title=3 Bedroom Apartment for Sale in New Capital Ci
ty, Cairo - WhatsApp Image 2024-03-12 at 8.41. 33 PM (4). jpeg
                                aria-label="Fallback listing photo"
                            />
                        EGP4,627,000Apartment34Area:157 Sq. M.Apartment for sale in
the New Administrative Capital - New Cairo - Al Maqsad Compound (R3) - 5% - 10% down
 paymentAl Maqsad, New Capital City, Cairo Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15694408-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15694408-240x180.jpeg
                                class=_062617f4
                                alt=Patria Real Estate
                                title=Patria Real Estate
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"Receive now a fully finished chalet of 150 meters, first row on the sea, the best b
each in La Vista, Ras El Hekma, North Coast","url":"https://www.bayut.eg/en/property
/details-500604497.html","geo":{"@type":"GeoCoordinates","latitude":31.0682429,"long
itude":28.3598287},"floorSize":{"@type":"QuantitativeValue","value":"150","unitText"
:"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"3"
},"numberOfBathroomsTotal":"3","image":"https://bayut-eg-production.s3.amazonaws.com
/thumbnails/15868216-400x300.jpeg","address":{"@type":"PostalAddress","addressCountr
y":"Egypt","addressRegion":"Matruh","addressLocality":"North Coast"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868216-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868216-400x300.jpeg
                                class=b798ac26
                                alt=3 Bedroom Chalet for Sale in North Coast, Matruh
 - 16800869971680086997_642417d5006e8. png
                                title=3 Bedroom Chalet for Sale in North Coast, Matr
uh - 16800869971680086997_642417d5006e8. png
                                aria-label="Fallback listing photo"
                            />
                        EGP15,240,000Chalet33Area:150 Sq. M.Receive now a fully fini
shed chalet of 150 meters, first row on the sea, the best beach in La Vista, Ras El
Hekma, North CoastLa Vista Bay North Coast, North Coast, Matruh Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1896657-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1896657-240x180.jpeg
                                class=_062617f4
                                alt=Falcon Real Estate
                                title=Falcon Real Estate
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"At a snapshot price + 50% discount / townhouse for sale in installments in New Shei
kh Zayed","url":"https://www.bayut.eg/en/property/details-500604371.html","geo":{"@t
ype":"GeoCoordinates","latitude":30.0350735,"longitude":30.982366},"floorSize":{"@ty
pe":"QuantitativeValue","value":"320","unitText":"SQM"},"numberOfRooms":{"@type":"Qu
antitativeValue","name":"Bedroom(s)","value":"5"},"numberOfBathroomsTotal":"3","imag
e":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/15867446-400x300.jpeg","
address":{"@type":"PostalAddress","addressCountry":"Egypt","addressRegion":"Giza","a
ddressLocality":"Sheikh Zayed"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15867446-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15867446-400x300.jpeg
                                class=b798ac26
                                alt=5 Bedroom Townhouse for Sale in Sheikh Zayed, Gi
za - Village West (27). jpg
                                title=5 Bedroom Townhouse for Sale in Sheikh Zayed,
Giza - Village West (27). jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP1,500,000Townhouse53Area:320 Sq. M.At a snapshot price +
50% discount / townhouse for sale in installments in New Sheikh ZayedNew Zayed, Shei
kh Zayed, Giza Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/14766461-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/14766461-240x180.jpeg
                                class=_062617f4
                                alt=El Hamad Real Estate
                                title=El Hamad Real Estate
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"Chalet for sale in Solare North Coast - view on the sea and lagoon - Misr Italia Re
al Estate Development Company -5% down payment - fully finished","url":"https://www.
bayut.eg/en/property/details-500604578.html","geo":{"@type":"GeoCoordinates","latitu
de":31.085864,"longitude":28.047712},"floorSize":{"@type":"QuantitativeValue","value
":"120","unitText":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bedro
om(s)","value":"2"},"numberOfBathroomsTotal":"2","image":"https://bayut-eg-productio
n.s3.amazonaws.com/thumbnails/15868601-400x300.jpeg","address":{"@type":"PostalAddre
ss","addressCountry":"Egypt","addressRegion":"Matruh","addressLocality":"North Coast
"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868601-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868601-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Chalet for Sale in North Coast, Matruh
 - 4. png
                                title=2 Bedroom Chalet for Sale in North Coast, Matr
uh - 4. png
                                aria-label="Fallback listing photo"
                            />
                        EGP10,100,000Chalet22Area:120 Sq. M.Chalet for sale in Solar
e North Coast - view on the sea and lagoon - Misr Italia Real Estate Development Com
pany -5% down payment - fully finishedSOLARE, North Coast, Matruh Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407348-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407348-240x180.jpeg
                                class=_062617f4
                                alt=Capital Agency
                                title=Capital Agency
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"Chalet for sale in Solare North Coast - view on the sea and lagoon - Misr Italia Re
al Estate Development Company -5% down payment - fully finished","url":"https://www.
bayut.eg/en/property/details-500604572.html","geo":{"@type":"GeoCoordinates","latitu
de":31.085864,"longitude":28.047712},"floorSize":{"@type":"QuantitativeValue","value
":"114","unitText":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bedro
om(s)","value":"2"},"numberOfBathroomsTotal":"2","image":"https://bayut-eg-productio
n.s3.amazonaws.com/thumbnails/15868524-400x300.jpeg","address":{"@type":"PostalAddre
ss","addressCountry":"Egypt","addressRegion":"Matruh","addressLocality":"North Coast
"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868524-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868524-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Chalet for Sale in North Coast, Matruh
 - 4. png
                                title=2 Bedroom Chalet for Sale in North Coast, Matr
uh - 4. png
                                aria-label="Fallback listing photo"
                            />
                        EGP9,700,000Chalet22Area:114 Sq. M.Chalet for sale in Solare
 North Coast - view on the sea and lagoon - Misr Italia Real Estate Development Comp
any -5% down payment - fully finishedSOLARE, North Coast, Matruh Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407348-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407348-240x180.jpeg
                                class=_062617f4
                                alt=Capital Agency
                                title=Capital Agency
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Chalet for sale in Solare North Coast - view on the sea and lagoon - Misr Italia Re
al Estate Development Company -5% down payment - fully finished","url":"https://www.
bayut.eg/en/property/details-500604562.html","geo":{"@type":"GeoCoordinates","latitu
de":31.085864,"longitude":28.047712},"floorSize":{"@type":"QuantitativeValue","value
":"115","unitText":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bedro
om(s)","value":"2"},"numberOfBathroomsTotal":"2","image":"https://bayut-eg-productio
n.s3.amazonaws.com/thumbnails/15868477-400x300.jpeg","address":{"@type":"PostalAddre
ss","addressCountry":"Egypt","addressRegion":"Matruh","addressLocality":"North Coast
"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868477-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868477-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Apartment for Sale in North Coast, Mat
ruh - 4. png
                                title=2 Bedroom Apartment for Sale in North Coast, M
atruh - 4. png
                                aria-label="Fallback listing photo"
                            />
                        EGP9,700,000Apartment22Area:115 Sq. M.Chalet for sale in Sol
are North Coast - view on the sea and lagoon - Misr Italia Real Estate Development C
ompany -5% down payment - fully finishedSOLARE, North Coast, Matruh Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407348-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407348-240x180.jpeg
                                class=_062617f4
                                alt=Capital Agency
                                title=Capital Agency
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"Townhouse, immediate delivery in the heart of Sheikh Zayed, installments up to 6 ye
ars","url":"https://www.bayut.eg/en/property/details-500604324.html","geo":{"@type":
"GeoCoordinates","latitude":30.0445728,"longitude":31.0243959},"floorSize":{"@type":
"QuantitativeValue","value":"230","unitText":"SQM"},"numberOfRooms":{"@type":"Quanti
tativeValue","name":"Bedroom(s)","value":"3"},"numberOfBathroomsTotal":"4","image":"
https://bayut-eg-production.s3.amazonaws.com/thumbnails/15867233-400x300.jpeg","addr
ess":{"@type":"PostalAddress","addressCountry":"Egypt","addressRegion":"Giza","addre
ssLocality":"Sheikh Zayed"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15867233-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15867233-400x300.jpeg
                                class=b798ac26
                                alt=3 Bedroom Townhouse for Sale in Sheikh Zayed, Gi
za - image-005. jpg
                                title=3 Bedroom Townhouse for Sale in Sheikh Zayed,
Giza - image-005. jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP15,000,000Townhouse34Area:230 Sq. M.Townhouse, immediate
delivery in the heart of Sheikh Zayed, installments up to 6 yearsVillage West, Sheik
h Zayed, Giza Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/6321088-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/6321088-240x180.jpeg
                                class=_062617f4
                                alt=Headway properties
                                title=Headway properties
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"أفضل استثمار الان شقة للبيع في كمبوند هايد بارك بمقدم 5% وقسط على8 سنوات","url":"ht
tps://www.bayut.eg/en/property/details-500604519.html","geo":{"@type":"GeoCoordinate
s","latitude":29.9842656,"longitude":31.540594},"floorSize":{"@type":"QuantitativeVa
lue","value":"82","unitText":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","na
me":"Bedroom(s)","value":"1"},"numberOfBathroomsTotal":"1","image":"https://bayut-eg
-production.s3.amazonaws.com/thumbnails/15868318-400x300.jpeg","address":{"@type":"P
ostalAddress","addressCountry":"Egypt","addressRegion":"Cairo","addressLocality":"Ne
w Cairo"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868318-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868318-400x300.jpeg
                                class=b798ac26
                                alt=1 Bedroom Flat for Sale in New Cairo, Cairo - Wh
atsApp Image 2023-04-07 at 3.27. 25 PM. jpeg
                                title=1 Bedroom Flat for Sale in New Cairo, Cairo -
WhatsApp Image 2023-04-07 at 3.27. 25 PM. jpeg
                                aria-label="Fallback listing photo"
                            />
                        EGP6,945,000Apartment11Area:82 Sq. M.أفضل استثمار الان شقة ل
لبيع في كمبوند هايد بارك بمقدم 5% وقسط على8 سنواتHyde Park New Cairo, New Cairo, Cai
ro Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/8575904-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/8575904-240x180.jpeg
                                class=_062617f4
                                alt=Cayan Egypt
                                title=Cayan Egypt
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"Receive a fully finished chalet in Ras El Hekma in installments up to 9 years","url
":"https://www.bayut.eg/en/property/details-500604251.html","geo":{"@type":"GeoCoord
inates","latitude":31.1903125,"longitude":27.5931875},"floorSize":{"@type":"Quantita
tiveValue","value":"200","unitText":"SQM"},"numberOfRooms":{"@type":"QuantitativeVal
ue","name":"Bedroom(s)","value":"3"},"numberOfBathroomsTotal":"4","image":"https://b
ayut-eg-production.s3.amazonaws.com/thumbnails/15867006-400x300.jpeg","address":{"@t
ype":"PostalAddress","addressCountry":"Egypt","addressRegion":"Matruh","addressLocal
ity":"North Coast"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15867006-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15867006-400x300.jpeg
                                class=b798ac26
                                alt=3 Bedroom Chalet for Sale in North Coast, Matruh
 - img41. jpg
                                title=3 Bedroom Chalet for Sale in North Coast, Matr
uh - img41. jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP15,000,000Chalet34Area:200 Sq. M.Receive a fully finished
 chalet in Ras El Hekma in installments up to 9 yearsSilver Sands, North Coast, Matr
uh Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/6321088-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/6321088-240x180.jpeg
                                class=_062617f4
                                alt=Headway properties
                                title=Headway properties
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"Solare North Coast شالية للبيع بسعر مميز متطشب كامل وبفيو كامل للبحر بارقي قرية سول
اري الساحل الشمالي","url":"https://www.bayut.eg/en/property/details-500604247.html",
"geo":{"@type":"GeoCoordinates","latitude":31.085864,"longitude":28.047712},"floorSi
ze":{"@type":"QuantitativeValue","value":"114","unitText":"SQM"},"numberOfRooms":{"@
type":"QuantitativeValue","name":"Bedroom(s)","value":"2"},"numberOfBathroomsTotal":
"2","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/15866967-400x30
0.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt","addressRegion":
"Matruh","addressLocality":"North Coast"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15866967-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15866967-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Chalet for Sale in North Coast, Matruh
 - WhatsApp Image 2024-03-12 at 12.02. 52_bf1ac9fe. jpg
                                title=2 Bedroom Chalet for Sale in North Coast, Matr
uh - WhatsApp Image 2024-03-12 at 12.02. 52_bf1ac9fe. jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP985,000Chalet22Area:114 Sq. M.Solare North Coast شالية لل
بيع بسعر مميز متطشب كامل وبفيو كامل للبحر بارقي قرية سولاري الساحل الشماليSOLARE, No
rth Coast, Matruh Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/14898387-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/14898387-240x180.jpeg
                                class=_062617f4
                                alt=Genesis Commercial Agencies
                                title=Genesis Commercial Agencies
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Own an apartment in the heart of New Cairo - The Crest | With a 5% down payment and
 equal installments over 7 years","url":"https://www.bayut.eg/en/property/details-50
0604521.html","geo":{"@type":"GeoCoordinates","latitude":29.96511984,"longitude":31.
54484867},"floorSize":{"@type":"QuantitativeValue","value":"95","unitText":"SQM"},"n
umberOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"1"},"numberO
fBathroomsTotal":"1","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnail
s/15868347-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt"
,"addressRegion":"Cairo","addressLocality":"New Cairo"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868347-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868347-400x300.jpeg
                                class=b798ac26
                                alt=1 Bedroom Flat for Sale in New Cairo, Cairo - .
. . . . png
                                title=1 Bedroom Flat for Sale in New Cairo, Cairo -
. . . . . png
                                aria-label="Fallback listing photo"
                            />
                        EGP6,300,000Apartment11Area:95 Sq. M.Own an apartment in the
 heart of New Cairo - The Crest | With a 5% down payment and equal installments over
 7 yearsThe Crest, New Cairo, Cairo Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407348-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407348-240x180.jpeg
                                class=_062617f4
                                alt=Capital Agency
                                title=Capital Agency
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"Own a duplex with a garden in the heart of New Cairo - The Crest | With a 5% down p
ayment and equal installments over 7 years","url":"https://www.bayut.eg/en/property/
details-500604512.html","geo":{"@type":"GeoCoordinates","latitude":29.96511984,"long
itude":31.54484867},"floorSize":{"@type":"QuantitativeValue","value":"210","unitText
":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"3
"},"numberOfBathroomsTotal":"3","image":"https://bayut-eg-production.s3.amazonaws.co
m/thumbnails/15868304-400x300.jpeg","address":{"@type":"PostalAddress","addressCount
ry":"Egypt","addressRegion":"Cairo","addressLocality":"New Cairo"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868304-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868304-400x300.jpeg
                                class=b798ac26
                                alt=3 Bedroom Duplex for Sale in New Cairo, Cairo -
. . . . . png
                                title=3 Bedroom Duplex for Sale in New Cairo, Cairo
- . . . . . png
                                aria-label="Fallback listing photo"
                            />
                        EGP18,200,000Duplex33Area:210 Sq. M.Own a duplex with a gard
en in the heart of New Cairo - The Crest | With a 5% down payment and equal installm
ents over 7 yearsThe Crest, New Cairo, Cairo Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407348-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407348-240x180.jpeg
                                class=_062617f4
                                alt=Capital Agency
                                title=Capital Agency
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Residence","name":
"Own a duplex with a garden in the heart of New Cairo - The Crest | With a 5% down p
ayment and equal installments over 7 years","url":"https://www.bayut.eg/en/property/
details-500604509.html","geo":{"@type":"GeoCoordinates","latitude":29.96511984,"long
itude":31.54484867},"floorSize":{"@type":"QuantitativeValue","value":"215","unitText
":"SQM"},"numberOfRooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"3
"},"numberOfBathroomsTotal":"3","image":"https://bayut-eg-production.s3.amazonaws.co
m/thumbnails/15868279-400x300.jpeg","address":{"@type":"PostalAddress","addressCount
ry":"Egypt","addressRegion":"Cairo","addressLocality":"New Cairo"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15868279-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15868279-400x300.jpeg
                                class=b798ac26
                                alt=3 Bedroom Duplex for Sale in New Cairo, Cairo -
. . . . . png
                                title=3 Bedroom Duplex for Sale in New Cairo, Cairo
- . . . . . png
                                aria-label="Fallback listing photo"
                            />
                        EGP17,800,000Duplex33Area:215 Sq. M.Own a duplex with a gard
en in the heart of New Cairo - The Crest | With a 5% down payment and equal installm
ents over 7 yearsThe Crest, New Cairo, Cairo Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407348-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407348-240x180.jpeg
                                class=_062617f4
                                alt=Capital Agency
                                title=Capital Agency
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Fully Finished Apartment For sale in Zed West Towers Ora in El sheikh Zayed with do
wn payment Prime location","url":"https://www.bayut.eg/en/property/details-500604375
.html","geo":{"@type":"GeoCoordinates","latitude":30.0468424,"longitude":30.998248},
"floorSize":{"@type":"QuantitativeValue","value":"185","unitText":"SQM"},"numberOfRo
oms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"3"},"numberOfBathroom
sTotal":"2","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/1586747
0-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt","address
Region":"Giza","addressLocality":"Sheikh Zayed"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15867470-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15867470-400x300.jpeg
                                class=b798ac26
                                alt=3 Bedroom Flat for Sale in Sheikh Zayed, Giza -
11307506-d94f-11ee-9baa-0afb7dc6958f. jpg
                                title=3 Bedroom Flat for Sale in Sheikh Zayed, Giza
- 11307506-d94f-11ee-9baa-0afb7dc6958f. jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP21,400,296Apartment32Area:185 Sq. M.Fully Finished Apartm
ent For sale in Zed West Towers Ora in El sheikh Zayed with down payment Prime locat
ionZED Towers, Sheikh Zayed, Giza Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407343-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407343-240x180.jpeg
                                class=_062617f4
                                alt=Egy Property
                                title=Egy Property
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Apartment For sale Fully Finished in Zed West Towers Ora in El sheikh Zayed with do
wn payment Prime location","url":"https://www.bayut.eg/en/property/details-500604354
.html","geo":{"@type":"GeoCoordinates","latitude":30.0468424,"longitude":30.998248},
"floorSize":{"@type":"QuantitativeValue","value":"143","unitText":"SQM"},"numberOfRo
oms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"2"},"numberOfBathroom
sTotal":"2","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/1586752
8-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt","address
Region":"Giza","addressLocality":"Sheikh Zayed"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15867528-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15867528-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Apartment for Sale in Sheikh Zayed, Gi
za - 104f9c9c-d94f-11ee-9baa-0afb7dc6958f. jpg
                                title=2 Bedroom Apartment for Sale in Sheikh Zayed,
Giza - 104f9c9c-d94f-11ee-9baa-0afb7dc6958f. jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP10,437,280Apartment22Area:143 Sq. M.Apartment For sale Fu
lly Finished in Zed West Towers Ora in El sheikh Zayed with down payment Prime locat
ionZED Towers, Sheikh Zayed, Giza Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407343-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407343-240x180.jpeg
                                class=_062617f4
                                alt=Egy Property
                                title=Egy Property
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Fully Finished Apartment with down payment and installments For sale in Zed West To
wers Ora in Prime location","url":"https://www.bayut.eg/en/property/details-50060433
9.html","geo":{"@type":"GeoCoordinates","latitude":30.0468424,"longitude":30.998248}
,"floorSize":{"@type":"QuantitativeValue","value":"129","unitText":"SQM"},"numberOfR
ooms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"2"},"numberOfBathroo
msTotal":"2","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/158672
98-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt","addres
sRegion":"Giza","addressLocality":"Sheikh Zayed"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15867298-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15867298-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Flat for Sale in Sheikh Zayed, Giza -
11df6abb-d94f-11ee-9baa-0afb7dc6958f. jpg
                                title=2 Bedroom Flat for Sale in Sheikh Zayed, Giza
- 11df6abb-d94f-11ee-9baa-0afb7dc6958f. jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP11,000,000Apartment22Area:129 Sq. M.Fully Finished Apartm
ent with down payment and installments For sale in Zed West Towers Ora in Prime loca
tionZED Towers, Sheikh Zayed, Giza Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407343-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407343-240x180.jpeg
                                class=_062617f4
                                alt=Egy Property
                                title=Egy Property
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Fully Finished Apartment For sale in Zed West Towers Ora in El sheikh Zayed with do
wn payment Prime location","url":"https://www.bayut.eg/en/property/details-500604291
.html","geo":{"@type":"GeoCoordinates","latitude":30.0468424,"longitude":30.998248},
"floorSize":{"@type":"QuantitativeValue","value":"142","unitText":"SQM"},"numberOfRo
oms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"2"},"numberOfBathroom
sTotal":"2","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/1586712
3-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt","address
Region":"Giza","addressLocality":"Sheikh Zayed"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15867123-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15867123-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Flat for Sale in Sheikh Zayed, Giza -
10c4631f-d94f-11ee-9baa-0afb7dc6958f. jpg
                                title=2 Bedroom Flat for Sale in Sheikh Zayed, Giza
- 10c4631f-d94f-11ee-9baa-0afb7dc6958f. jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP15,841,979Apartment22Area:142 Sq. M.Fully Finished Apartm
ent For sale in Zed West Towers Ora in El sheikh Zayed with down payment Prime locat
ionZED Towers, Sheikh Zayed, Giza Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407343-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407343-240x180.jpeg
                                class=_062617f4
                                alt=Egy Property
                                title=Egy Property
                                aria-label="Fallback listing photo"
                            />
                        {"@context":"https://schema.org","@type":"Apartment","name":
"Apartment Fully Finished For sale in Zed West Towers Ora in El sheikh Zayed with do
wn payment Prime location","url":"https://www.bayut.eg/en/property/details-500604439
.html","geo":{"@type":"GeoCoordinates","latitude":30.0468424,"longitude":30.998248},
"floorSize":{"@type":"QuantitativeValue","value":"137","unitText":"SQM"},"numberOfRo
oms":{"@type":"QuantitativeValue","name":"Bedroom(s)","value":"2"},"numberOfBathroom
sTotal":"2","image":"https://bayut-eg-production.s3.amazonaws.com/thumbnails/1586785
9-400x300.jpeg","address":{"@type":"PostalAddress","addressCountry":"Egypt","address
Region":"Giza","addressLocality":"Sheikh Zayed"}}
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/15867859-400x300.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/15867859-400x300.jpeg
                                class=b798ac26
                                alt=2 Bedroom Flat for Sale in Sheikh Zayed, Giza -
11307506-d94f-11ee-9baa-0afb7dc6958f. jpg
                                title=2 Bedroom Flat for Sale in Sheikh Zayed, Giza
- 11307506-d94f-11ee-9baa-0afb7dc6958f. jpg
                                aria-label="Fallback listing photo"
                            />
                        EGP10,250,000Apartment22Area:137 Sq. M.Apartment Fully Finis
hed For sale in Zed West Towers Ora in El sheikh Zayed with down payment Prime locat
ionZED Towers, Sheikh Zayed, Giza Call  Email
                            <source type="image/webp" srcSet=https://bayut-eg-produc
tion.s3.amazonaws.com/thumbnails/1407343-240x180.webp />
                            <img
                                role="presentation"
                                src=https://bayut-eg-production.s3.amazonaws.com/thu
mbnails/1407343-240x180.jpeg
                                class=_062617f4
                                alt=Egy Property
                                title=Egy Property
                                aria-label="Fallback listing photo"
                            />s

*/
