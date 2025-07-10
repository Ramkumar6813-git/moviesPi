const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_MATRICS_ID;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

console.log(projectId);
console.log(collectionId);
console.log(databaseId);

export const updateSearchCount = async () => {
  console.log(projectId);
  console.log(collectionId);
  console.log(databaseId);
};
