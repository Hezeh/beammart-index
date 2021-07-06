const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const axios = require("axios");
// const { database } = require("firebase-admin");
const { PubSub } = require('@google-cloud/pubsub');
const { v4: uuidv4 } = require('uuid');

admin.initializeApp();

const db = admin.firestore();
const itemsRef = db.collection('items');
const projectId = 'beammart'

// Instantiates a client
const pubsub = new PubSub({ projectId });

// TODOs
// Send messages to pub/sub when all messages are invoked
async function publishMessage(data, topicName) {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);

    try {
        const messageId = await pubsub.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}

// On Profile/{userId}/items/{itemId} document created
exports.createProfileItem = functions.firestore
    .document(`profile/{userId}/items/{itemId}`)
    .onCreate(async (snap, context) => {
        const newValue = snap.data();
        const _title = newValue.title;
        const _price = newValue.price;
        const _description = newValue.description;
        const _dateAdded = newValue.dateAdded;
        const _dateModified = newValue.dateModified;
        const _imageUrls = newValue.images;
        const userId = context.params.userId;
        const itemId = context.params.itemId;
        const _inStock = newValue.inStock;
        const _category = newValue.category;
        const _subCategory = newValue.subCategory;
        const _isActive = newValue.isActive;
        const _lastRenewal = newValue.lastRenewal;

        const doc = await db.collection('profile').doc(`${userId}`).get();

        if (!doc.exists) {
            console.log('No such document!');
        } else {
            const _location = doc.data()['gpsLocation'];
            const _phoneNumber = doc.data()['phoneNumber'];
            const _businessName = doc.data()['businessName'];
            const _businessDescription = doc.data()['businessDescription'];
            const _locationDescription = doc.data()['locationDescription'];
            const _isMondayOpen = doc.data()['isMondayOpen'];
            const _isTuesdayOpen = doc.data()['isTuesdayOpen'];
            const _isWednesdayOpen = doc.data()['isWednesdayOpen'];
            const _isThursdayOpen = doc.data()['isThursdayOpen'];
            const _isFridayOpen = doc.data()['isFridayOpen'];
            const _isSaturdayOpen = doc.data()['isSaturdayOpen'];
            const _isSundayOpen = doc.data()['isSundayOpen'];
            const _mondayOpeningHours = doc.data()['mondayOpeningHours'];
            const _mondayClosingHours = doc.data()['mondayClosingHours'];
            const _tuesdayOpeningHours = doc.data()['tuesdayOpeningHours'];
            const _tuesdayClosingHours = doc.data()['tuesdayClosingHours'];
            const _wednesdayOpeningHours = doc.data()['wednesdayOpeningHours'];
            const _wednesdayClosingHours = doc.data()['wednesdayClosingHours'];
            const _thursdayOpeningHours = doc.data()['thursdayOpeningHours'];
            const _thursdayClosingHours = doc.data()['thursdayClosingHours'];
            const _fridayOpeningHours = doc.data()['fridayOpeningHours'];
            const _fridayClosingHours = doc.data()['fridayClosingHours'];
            const _saturdayOpeningHours = doc.data()['saturdayOpeningHours'];
            const _saturdayClosingHours = doc.data()['saturdayClosingHours'];
            const _sundayOpeningHours = doc.data()['sundayOpeningHours'];
            const _sundayClosingHours = doc.data()['sundayClosingHours'];
            const _businessProfilePhoto = doc.data()['businessProfilePhoto'];

            const _data = {}

            if (_location != null) {
                _data['location'] = _location;
            }
            if (_phoneNumber != null) {
                _data['phoneNumber'] = _phoneNumber;
            }
            if (_businessName != null) {
                _data['businessName'] = _businessName;
            }
            if (_businessDescription != null) {
                _data['businessDescription'] = _businessDescription;
            }
            if (_locationDescription != null) {
                _data['locationDescription'] = _locationDescription;
            }
            if (_isMondayOpen != null) {
                _data['isMondayOpen'] = _isMondayOpen;
            }
            if (_isTuesdayOpen != null) {
                _data['isTuesdayOpen'] = _isTuesdayOpen;
            }
            if (_isWednesdayOpen != null) {
                _data['isWednesdayOpen'] = _isWednesdayOpen;
            }
            if (_isThursdayOpen != null) {
                _data['isThursdayOpen'] = _isThursdayOpen;
            }
            if (_isFridayOpen != null) {
                _data['isFridayOpen'] = _isFridayOpen;
            }
            if (_isSaturdayOpen != null) {
                _data['isSaturdayOpen'] = _isSaturdayOpen;
            }
            if (_isSundayOpen != null) {
                _data['isSundayOpen'] = _isSundayOpen;
            }
            if (_mondayOpeningHours != null) {
                _data['mondayOpeningHours'] = _mondayOpeningHours;
            }
            if (_mondayClosingHours != null) {
                _data['mondayClosingHours'] = _mondayClosingHours;
            }
            if (_tuesdayOpeningHours != null) {
                _data['tuesdayOpeningHours'] = _tuesdayOpeningHours;
            }
            if (_tuesdayClosingHours != null) {
                _data['tuesdayClosingHours'] = _tuesdayClosingHours;
            }
            if (_wednesdayOpeningHours != null) {
                _data['wednesdayOpeningHours'] = _wednesdayOpeningHours;
            }
            if (_wednesdayClosingHours != null) {
                _data['wednesdayClosingHours'] = _wednesdayClosingHours;
            }
            if (_thursdayOpeningHours != null) {
                _data['thursdayOpeningHours'] = _thursdayOpeningHours;
            }
            if (_thursdayClosingHours != null) {
                _data['thursdayClosingHours'] = _thursdayClosingHours;
            }
            if (_fridayOpeningHours != null) {
                _data['fridayOpeningHours'] = _fridayOpeningHours;
            }
            if (_fridayClosingHours != null) {
                _data['fridayClosingHours'] = _fridayClosingHours;
            }
            if (_saturdayOpeningHours != null) {
                _data['saturdayOpeningHours'] = _saturdayOpeningHours;
            }
            if (_saturdayClosingHours != null) {
                _data['saturdayClosingHours'] = _saturdayClosingHours;
            }
            if (_sundayOpeningHours != null) {
                _data['sundayOpeningHours'] = _sundayOpeningHours;
            }
            if (_sundayClosingHours != null) {
                _data['sundayClosingHours'] = _sundayClosingHours;
            }
            if (_businessProfilePhoto != null) {
                _data['businessProfilePhoto'] = _businessProfilePhoto;
            }
            if (itemId != null) {
                _data["itemId"] = itemId
            }
            if (_title != null) {
                _data['title'] = _title;
            }
            if (_price != null) {
                _data['price'] = _price;
            }
            if (_description != null) {
                _data['description'] = _description;
            }
            if (_dateAdded != null) {
                _data['dateAdded'] = _dateAdded;
            }
            if (_dateModified != null) {
                _data['dateModified'] = _dateModified;
            }
            if (_imageUrls != null) {
                _data['imageUrls'] = _imageUrls;
            }
            if (_inStock != null) {
                _data['inStock'] = _inStock;
            }
            if (_category != null) {
                _data['category'] = _category;
            }
            if (_subCategory != null) {
                _data['subCategory'] = _subCategory;
            }
            if (userId != null) {
                _data['userId'] = userId;
            }
            if (_lastRenewal != null) {
                _data['lastRenewal'] = _lastRenewal;
            }
            if (_isActive != null) {
                _data['isActive'] = _isActive;
            }

            // Create doc in firebase collection
            await itemsRef.doc(`${itemId}`).set(_data);
        }
    });

// on Profile/{userId}/items/{itemId} document deleted
exports.deleteProfileItem = functions.firestore
    .document('profile/{userId}/items/{itemId}')
    .onDelete(async (snap, context) => {
        // Delete document in /items collection
        const itemId = context.params.itemId;
        await itemsRef.doc(itemId).delete();
    });

// On Profile/{userId}/items/{itemId} document updated
exports.updateProfileItem = functions.firestore
    .document('profile/{userId}/items/{itemId}')
    .onUpdate(async (change, context) => {
        // Update the items collection
        itemId = context.params.itemId;
        const dataBefore = change.before.data();
        const dataAfter = change.after.data();
        console.log(dataAfter);
        await itemsRef.doc(itemId).set({
            'title': dataAfter.title,
            'description': dataAfter.description,
            'price': dataAfter.price,
            'dateModified': dataAfter.dateModified,
            'inStock': dataAfter.inStock,
            'isActive': dataAfter.isActive,
            'lastRenewal': dataAfter.lastRenewal,
            'imageUrls': dataAfter.images,
        }, { merge: true });
    });

// On Profile/{userId} Update -> Update the /items collection
exports.profileUpdate = functions.firestore
    .document('profile/{userId}')
    .onUpdate(async (change, context) => {
        const userId = context.params.userId;
        const dataBefore = change.before.data();
        const dataAfter = change.after.data();
        // Fetch all documents with the userId
        const profileSnapshots = await itemsRef.where('userId', '==', `${userId}`).get();
        // Update all the documents in /items collection
        profileSnapshots.forEach(async (doc) => {
            const docId = doc.id;
            if (dataAfter.businessName != dataBefore.businessName) {
                await itemsRef.doc(docId).set({ 'businessName': dataAfter.businessName }, { merge: true });
            }
            if (dataAfter.gpsLocation != dataBefore.gpsLocation) {
                if (doc.exists) {
                    await itemsRef.doc(docId).update({ 'location': dataAfter.gpsLocation });
                }
            }
            if (dataAfter.locationDescription != dataBefore.locationDescription) {
                await itemsRef.doc(docId).set({ 'locationDescription': dataAfter.locationDescription }, { merge: true });
            }
            if (dataAfter.businessDescription != dataBefore.businessDescription) {
                await itemsRef.doc(docId).set({ 'businessDescription': dataAfter.businessDescription }, { merge: true });
            }
            if (dataAfter.phoneNumber != dataBefore.phoneNumber) {
                await itemsRef.doc(docId).set({ 'phoneNumber': dataAfter.phoneNumber }, { merge: true });
            }
            // Monday
            if (dataAfter.mondayOpeningHours != dataBefore.mondayOpeningHours) {
                await itemsRef.doc(docId).set({ 'mondayOpeningHours': dataAfter.mondayOpeningHours }, { merge: true });
            }
            if (dataAfter.mondayClosingHours != dataBefore.mondayClosingHours) {
                await itemsRef.doc(docId).set({ 'mondayClosingHours': dataAfter.mondayClosingHours }, { merge: true });
            }
            // Tuesday
            if (dataAfter.tuesdayOpeningHours != dataBefore.tuesdayOpeningHours) {
                await itemsRef.doc(docId).set({ 'tuesdayOpeningHours': dataAfter.tuesdayOpeningHours }, { merge: true });
            }
            if (dataAfter.tuesdayClosingHours != dataBefore.tuesdayClosingHours) {
                await itemsRef.doc(docId).set({ 'tuesdayClosingHours': dataAfter.tuesdayClosingHours }, { merge: true });
            }
            // Wednesday
            if (dataAfter.wednesdayOpeningHours != dataBefore.wednesdayOpeningHours) {
                await itemsRef.doc(docId).set({ 'wednesdayOpeningHours': dataAfter.wednesdayOpeningHours }, { merge: true });
            }
            if (dataAfter.wednesdayClosingHours != dataBefore.wednesdayClosingHours) {
                await itemsRef.doc(docId).set({ 'wednesdayClosingHours': dataAfter.wednesdayClosingHours }, { merge: true });
            }
            // Thursday
            if (dataAfter.thursdayOpeningHours != dataBefore.thursdayOpeningHours) {
                await itemsRef.doc(docId).set({ 'thursdayOpeningHours': dataAfter.thursdayOpeningHours }, { merge: true });
            }
            if (dataAfter.thursdayClosingHours != dataBefore.thursdayClosingHours) {
                await itemsRef.doc(docId).set({ 'thursdayClosingHours': dataAfter.thursdayClosingHours }, { merge: true });
            }
            // Friday
            if (dataAfter.fridayOpeningHours != dataBefore.fridayOpeningHours) {
                await itemsRef.doc(docId).set({ 'fridayOpeningHours': dataAfter.fridayOpeningHours }, { merge: true });
            }
            if (dataAfter.fridayClosingHours != dataBefore.fridayClosingHours) {
                await itemsRef.doc(docId).set({ 'fridayClosingHours': dataAfter.fridayClosingHours }, { merge: true });
            }
            // Saturday
            if (dataAfter.saturdayOpeningHours != dataBefore.saturdayOpeningHours) {
                await itemsRef.doc(docId).set({ 'saturdayOpeningHours': dataAfter.saturdayOpeningHours }, { merge: true });
            }
            if (dataAfter.saturdayClosingHours != dataBefore.saturdayClosingHours) {
                await itemsRef.doc(docId).set({ 'saturdayClosingHours': dataAfter.saturdayClosingHours }, { merge: true });
            }
            // Sunday
            if (dataAfter.sundayOpeningHours != dataBefore.sundayOpeningHours) {
                await itemsRef.doc(docId).set({ 'sundayOpeningHours': dataAfter.sundayOpeningHours }, { merge: true });
            }
            if (dataAfter.sundayClosingHours != dataBefore.sundayClosingHours) {
                await itemsRef.doc(docId).set({ 'sundayClosingHours': dataAfter.sundayClosingHours }, { merge: true });
            }
            if (dataAfter.businessPhotos != dataBefore.businessPhotos) {
                await itemsRef.doc(itemId).set({ 'businessPhotos': dataAfter.businessPhotos }, { merge: true });
            }
            // Is the business open on the various weekdays
            if (dataAfter.isMondayOpen != dataBefore.isMondayOpen) {
                await itemsRef.doc(itemId).set({ 'isMondayOpen': dataAfter.isMondayOpen }, { merge: true });
            }
            if (dataAfter.isTuesdayOpen != dataBefore.isTuesdayOpen) {
                await itemsRef.doc(itemId).set({ 'isTuesdayOpen': dataAfter.isTuesdayOpen }, { merge: true });
            }
            if (dataAfter.isWednesdayOpen != dataBefore.isWednesdayOpen) {
                await itemsRef.doc(itemId).set({ 'isWednesdayOpen': dataAfter.isWednesdayOpen }, { merge: true });
            }
            if (dataAfter.isThursdayOpen != dataBefore.isThursdayOpen) {
                await itemsRef.doc(itemId).set({ 'isThursdayOpen': dataAfter.isThursdayOpen }, { merge: true });
            }
            if (dataAfter.isFridayOpen != dataBefore.isFridayOpen) {
                await itemsRef.doc(itemId).set({ 'isFridayOpen': dataAfter.isFridayOpen }, { merge: true });
            }
            if (dataAfter.isSaturdayOpen != dataBefore.isSaturdayOpen) {
                await itemsRef.doc(itemId).set({ 'isSaturdayOpen': dataAfter.isSaturdayOpen }, { merge: true });
            }
            if (dataAfter.isSundayOpen != dataBefore.isSundayOpen) {
                await itemsRef.doc(itemId).set({ 'isSundayOpen': dataAfter.isSundayOpen }, { merge: true });
            }
        });
    });

// On Item Create -> Index to Elasticsearch
exports.itemsCollectionCreate = functions.firestore
    .document('items/{itemId}')
    .onCreate(async (snap, context) => {
        const itemId = context.params.itemId;
        const url = 'https://api.beammart.app/index';
        // const url = 'http://127.0.0.1:8000/index';
        const item = {
            itemId: itemId
        };
        // Create document in Elasticsearch
        const data = snap.data()

        const userId = data.userId;
        const images = data.imageUrls;
        const title = data.title;
        const description = data.description;
        const price = data.price;
        const category = data.category;
        const subCategory = data.subCategory;
        const location = data.location;
        const locationDescription = data.locationDescription;
        const businessName = data.businessName;
        const businessDescription = data.businessDescription;
        const dateAdded = data.dateAdded;
        const dateModified = data.dateModified;
        const phoneNumber = data.phoneNumber;
        const inStock = data.inStock;
        const mondayOpeningHours = data.mondayOpeningHours;
        const mondayClosingHours = data.mondayClosingHours;
        const tuesdayOpeningHours = data.tuesdayOpeningHours;
        const tuesdayClosingHours = data.tuesdayClosingHours;
        const wednesdayOpeningHours = data.wednesdayOpeningHours;
        const wednesdayClosingHours = data.wednesdayClosingHours;
        const thursdayOpeningHours = data.thursdayOpeningHours;
        const thursdayClosingHours = data.thursdayClosingHours;
        const fridayOpeningHours = data.fridayOpeningHours;
        const fridayClosingHours = data.fridayClosingHours;
        const saturdayOpeningHours = data.saturdayOpeningHours;
        const saturdayClosingHours = data.saturdayClosingHours;
        const sundayOpeningHours = data.sundayOpeningHours;
        const sundayClosingHours = data.sundayClosingHours;
        const businessProfilePhoto = data.businessProfilePhoto;
        const isMondayOpen = data.isMondayOpen;
        const isTuesdayOpen = data.isTuesdayOpen;
        const isWednesdayOpen = data.isWednesdayOpen;
        const isThursdayOpen = data.isThursdayOpen;
        const isFridayOpen = data.isFridayOpen;
        const isSaturdayOpen = data.isSaturdayOpen;
        const isSundayOpen = data.isSundayOpen;

        if (businessProfilePhoto != null) {
            item.businessProfilePhoto = businessProfilePhoto;
        }
        if (isMondayOpen != null) {
            item.isMondayOpen = isMondayOpen;
        }
        if (isTuesdayOpen != null) {
            item.isTuesdayOpen = isTuesdayOpen;
        }
        if (isWednesdayOpen != null) {
            item.isWednesdayOpen = isWednesdayOpen;
        }
        if (isThursdayOpen != null) {
            item.isThursdayOpen = isThursdayOpen;
        }
        if (isFridayOpen != null) {
            item.isFridayOpen = isFridayOpen;
        }
        if (isSaturdayOpen != null) {
            item.isSaturdayOpen = isSaturdayOpen;
        }
        if (isSundayOpen != null) {
            item.isSundayOpen = isSundayOpen;
        }
        if (userId != null) {
            item.userId = userId;
        }
        if (images != null) {
            item.images = images;
        }
        if (description != null) {
            item.description = description;
        }
        if (title != null) {
            item.title = title;
        }
        if (price != null) {
            item.price = price;
        }
        if (category != null) {
            item.category = category;
        }
        if (subCategory != null) {
            item.subCategory = subCategory;
        }
        if (location != null) {
            item.location = location;
        }
        if (locationDescription != null) {
            item.locationDescription = locationDescription;
        }
        if (businessName != null) {
            item.businessName = businessName;
        }
        if (businessDescription != null) {
            item.businessDescription = businessDescription;
        }
        if (dateAdded != null) {
            item.dateAdded = dateAdded;
        }
        if (dateModified != null) {
            item.dateModified = dateModified;
        }
        if (phoneNumber != null) {
            item.phoneNumber = phoneNumber;
        }
        if (inStock != null) {
            item.inStock = inStock;
        }
        if (mondayOpeningHours != null) {
            item.mondayOpeningHours = mondayOpeningHours;
        }
        if (mondayClosingHours != null) {
            item.mondayClosingHours = mondayClosingHours;
        }
        if (tuesdayOpeningHours != null) {
            item.tuesdayOpeningHours = tuesdayOpeningHours;
        }
        if (tuesdayClosingHours != null) {
            item.tuesdayClosingHours = tuesdayClosingHours;
        }
        if (wednesdayOpeningHours != null) {
            item.wednesdayOpeningHours = wednesdayOpeningHours;
        }
        if (wednesdayClosingHours != null) {
            item.wednesdayClosingHours = wednesdayClosingHours;
        }
        if (thursdayOpeningHours != null) {
            item.thursdayOpeningHours = thursdayOpeningHours;
        }
        if (thursdayClosingHours != null) {
            item.thursdayClosingHours = thursdayClosingHours;
        }
        if (fridayOpeningHours != null) {
            item.fridayOpeningHours = fridayOpeningHours;
        }
        if (fridayClosingHours != null) {
            item.fridayClosingHours = fridayClosingHours;
        }
        if (saturdayOpeningHours != null) {
            item.saturdayOpeningHours = saturdayOpeningHours;
        }
        if (saturdayClosingHours != null) {
            item.saturdayClosingHours = saturdayClosingHours;
        }
        if (sundayOpeningHours != null) {
            item.sundayOpeningHours = sundayOpeningHours;
        }
        if (sundayClosingHours != null) {
            item.sundayClosingHours = sundayClosingHours;
        }

        const jsonItem = JSON.stringify(item);
        publishMessage(jsonItem, 'item-create')
        // console.log(jsonItem);
        // axios({
        //     method: 'POST',
        //     url: url,
        //     data: jsonItem
        // })
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err));

    });

// On Item Update -> Update Item in Elasticsearch
exports.itemsCollectionUpdate = functions.firestore
    .document('items/{itemId}')
    .onUpdate(async (change, context) => {
        const docId = context.params.itemId;
        const dataBefore = change.before.data();
        const dataAfter = change.after.data();
        const url = 'https://api.beammart.app/update';
        // const url = 'http://127.0.0.1:8000/update';
        // Update document in Elasticsearch
        const item = {
            itemId: docId,
            userId: dataBefore.userId,
            title: dataAfter.title,
            businessName: dataAfter.businessName,
            businessDescription: dataAfter.businessDescription,
            location: dataAfter.location,
            inStock: dataAfter.inStock,
            locationDescription: dataAfter.locationDescription,
            phoneNumber: dataAfter.phoneNumber,
            description: dataAfter.description,
            price: dataAfter.price,
            dateAdded: dataAfter.dateAdded,
            dateModified: dataAfter.dateModified,
            images: dataAfter.imageUrls,
            mondayOpeningHours: dataAfter.mondayOpeningHours,
            mondayClosingHours: dataAfter.mondayClosingHours,
            tuesdayOpeningHours: dataAfter.tuesdayOpeningHours,
            tuesdayClosingHours: dataAfter.tuesdayClosingHours,
            wednesdayOpeningHours: dataAfter.wednesdayOpeningHours,
            wednesdayClosingHours: dataAfter.wednesdayClosingHours,
            thursdayOpeningHours: dataAfter.thursdayOpeningHours,
            thursdayClosingHours: dataAfter.thursdayClosingHours,
            fridayOpeningHours: dataAfter.fridayOpeningHours,
            fridayClosingHours: dataAfter.fridayClosingHours,
            saturdayOpeningHours: dataAfter.saturdayOpeningHours,
            saturdayClosingHours: dataAfter.saturdayClosingHours,
            sundayOpeningHours: dataAfter.sundayOpeningHours,
            sundayClosingHours: dataAfter.sundayClosingHours,
            businessProfilePhoto: dataAfter.businessProfilePhoto,
            isMondayOpen: dataAfter.isMondayOpen,
            isTuesdayOpen: dataAfter.isTuesdayOpen,
            isWednesdayOpen: dataAfter.isWednesdayOpen,
            isThursdayOpen: dataAfter.isThursdayOpen,
            isFridayOpen: dataAfter.isFridayOpen,
            isSaturdayOpen: dataAfter.isSaturdayOpen,
            isSundayOpen: dataAfter.isSundayOpen,
            category: dataAfter.category,
            subCategory: dataAfter.subCategory,
        }

        const jsonItem = JSON.stringify(item);
        publishMessage(jsonItem, 'item-update')
        // axios({
        //     method: 'POST',
        //     url: url,
        //     data: jsonItem
        // })
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err));
    });

// On Item Delete -> Delete Item in Elasticsearch
exports.itemsCollectionDelete = functions.firestore
    .document('items/{itemId}')
    .onDelete(async (snap, context) => {
        const itemId = context.params.itemId;
        const url = 'https://api.beammart.app/delete';
        // const url = 'http://127.0.0.1:8000/delete';
        const item = {
            itemId: itemId,
            admin_email: "admin@localhost.com"
        }
        const jsonItem = JSON.stringify(item);
        publishMessage(jsonItem, 'item-delete')
        // axios({
        //     method: 'POST',
        //     url: url,
        //     data: jsonItem
        // })
    })

// Merchant Chat Notifications
exports.chatNotifications = functions.firestore
    .document("chats/{chatId}/{messageCollectionId}/{messageId}")
    .onWrite(async (change, context) => {
        const data = change.after.data();
        const chatId = context.params.chatId;
        const messageContent = data.messageContent;
        // const timestamp = data.timestamp;
        const sentByConsumer = data.sentByConsumer;

        // Read the chats/{chatId} doc
        const chatDoc = await db.collection('chats').doc(`${chatId}`).get();
        console.log(`Chat Id: ${chatId}`)

        if (sentByConsumer) {
            // If true send message to business
            if (!chatDoc.exists) {
                console.log("No such chatDocument")
            } else {
                const chatDocData = chatDoc.data()
                const consumerName = chatDocData.consumerDisplayName;
                const businessId = chatDocData.businessId;
                const consumerId = chatDocData.consumerId;
                const businessDoc = await db.collection('profile').doc(`${businessId}`).get();
                const businessDocData = businessDoc.data();
                console.log(`Business Id: ${businessId}`);
                if (!businessDoc.exists) {
                    console.log("No such businessDoc");
                } else {
                    const tokens = businessDocData.notificationsTokens;
                    const message = {
                        tokens: tokens,
                        data: {
                            type: JSON.stringify('chat'),
                            consumer: JSON.stringify(consumerName),
                            messageContent: JSON.stringify(messageContent),
                            businessId: JSON.stringify(businessId),
                            consumerId: JSON.stringify(consumerId),
                        },
                        notification: {
                            title: consumerName,
                            body: messageContent,
                        },
                        android: {
                            priority: "high"
                        }
                    }
                    await admin.messaging().send(
                        message
                    );
                }
            }
        } else {
            if (!chatDoc.exists) {
                console.log("No such chatDocument")
            } else {
                const chatDocData = chatDoc.data();
                const businessName = chatDocData.businessName;
                const consumerId = chatDocData.consumerId;
                const businessId = chatDocData.businessId;
                const consumerDoc = await db.collection('consumers').doc(`${consumerId}`).get();
                const consumerDocData = consumerDoc.data();
                if (!consumerDoc.exists) {
                    console.log("No such consumerDocument")
                } else {
                    const tokens = consumerDocData.notificationsTokens;
                    const message = {
                        tokens: tokens,
                        data: {
                            type: JSON.stringify('chat'),
                            title: JSON.stringify(businessName),
                            body: JSON.stringify(messageContent),
                            businessId: JSON.stringify(businessId),
                            consumerId: JSON.stringify(consumerId),
                        },
                        notification: {
                            title: businessName,
                            body: messageContent,
                        },
                        android: {
                            priority: "high",
                            notification: {
                                icon: 'ic_stat_name',
                                color: '#ff1493'
                            }
                        }
                    }
                    await admin.messaging().sendMulticast(
                        message
                    );
                }
            }
        }
    })