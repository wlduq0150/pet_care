export class ImageService {

    uploadImage = async (file) => {
        if (!file || !file.location) {
            const error = new Error("사진 파일이 잘못되었습니다.");
            error.status = 400;
            throw error;
        }
    
        return {
            ok: true,
            message: "사진이 성공적으로 업로드 되엇습니다.",
            data: {
                image: file.location
            }
        };
    }
}