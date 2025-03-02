const { db } = require("./firebaseConfig.js");
const { collection, getDocs, updateDoc, doc, deleteField } = require("firebase/firestore");

const renameField = async () => {
  const assessmentsRef = collection(db, "assessments");
  const snapshot = await getDocs(assessmentsRef);

  for (const document of snapshot.docs) {
    const data = document.data();

    if (data.Building_ID) {
      await updateDoc(doc(db, "assessments", document.id), {
        Assessment_ID: data.Building_ID, // Copy value
        Building_ID: deleteField() // Remove old field
      });

      console.log(`Updated document ${document.id}: Building_ID → Assessment_ID`);
    }
  }

  console.log("Field renaming complete!");
};

renameField().catch(console.error);