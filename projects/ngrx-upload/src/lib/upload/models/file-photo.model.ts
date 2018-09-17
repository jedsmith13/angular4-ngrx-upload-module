export class FilePhotoModel {
    constructor(public id: string , public buffer: File, public caption: string = '') {}
}