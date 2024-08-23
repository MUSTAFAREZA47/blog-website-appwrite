import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    database
    bucket

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // createing post
    async createPost(slug, {title, slug, content, featuredImage, status}) {
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    //updating post
    async updatePost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log(
                console.log('Appwrite service :: updatePost :: error', error),
            )
        }
    }

    // deleting post
    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            cconsole.log('Appwrite service :: createPost :: error', error)
            return false
        }
    }

    // get one post
    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }

    // get all posts
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('Appwrite service :: getPosts :: error', error)
            return false
        }
    }

    // file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error', error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}