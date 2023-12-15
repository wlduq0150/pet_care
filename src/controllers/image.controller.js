import { ImageService } from "../services/image.service.js";

export class ImageController {
    imageService = new ImageService();

    uploadImage = async (req, res, next) => {
        try {
            const result = await this.imageService.uploadImage(req.file);
            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
}
