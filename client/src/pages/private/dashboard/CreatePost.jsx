// import Loading from "../../../components/loading/Loading"
import { useState } from "react";
import Overview from "../../../components/overview/Overview"
import { BsCameraFill,  } from "react-icons/bs";
import { apiUploadImages } from "../../../services/listStory";
import { ImBin } from "react-icons/im";
import Loading from "../../../components/loading/Loading";
const CreatePost = () => {
    const [preview, setPreview] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [payload, setPayload] = useState({
        category_id: '',
        author: '',
        name: '',
        image: '',
        status: '',
        description: '',
        content: '',
    })

    // console.log("payload: ", payload);

    const handleFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        let images = {}
        let files = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', import.meta.env.VITE_UPLOAD_ASSETS_NAME)
            let response = await apiUploadImages(formData)
            // console.log(response);
            if (response.status === 200) images = response.data?.secure_url
        }
        setIsLoading(false)
        setPreview(images)
        setPayload(prev => ({...prev, image: images}))
        // console.log("images", images);
        // setIsLoading(false)
        // setImagesPreview(prev => [...prev, ...images])
    }

    // const [isLoading, setIsLoading] = useState(false)
    const handleDeleteImage = () => {
        setPreview(''); 
        setPayload(prevPayload => ({
          ...prevPayload,
          image: '',
        }));
      };
    const handleSubmit = async () => {
        // e.stopPropagation()
        console.log("payload", payload);
    }
    return (
        <div className='px-6'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Đăng tin mới</h1>
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    {/* <Overview payload={payload} setPayload={setPayload} /> */}
                    <Overview payload={payload} setPayload={setPayload}/>

                    <div className='w-full mb-6'>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <small>Cập nhật hình ảnh rõ ràng sẽ cho SEO nhanh hơn</small>
                        <div className='w-full '>
                            <label className='cursor-pointer w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor="file">
                                {isLoading
                                    ? <Loading />
                                    : <div className='flex flex-col items-center justify-center'>
                                        <BsCameraFill color='blue' size={50} />
                                        Thêm ảnh
                                    </div>}
                            </label>
                            <input  hidden type="file" id='file' onChange={handleFiles}/>
                            {/* <div className='w-full'>
                                <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview?.map(item => {
                                        return (
                                            <div key={item} className='relative w-1/3 h-1/3 '>
                                                <img src={item} alt="preview" className='w-full h-full object-cover rounded-md' />
                                                <span
                                                    title='Xóa'
                                                    onClick={() => handleDeleteImage(item)}
                                                    className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'
                                                >
                                                    <ImBin />
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
                        </div>
                        <div className="relative">
                            <img src={preview} alt="test img" className='w-full h-full object-cover rounded-md' />
                            <span  title="Xóa" onClick={handleDeleteImage} className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'><ImBin /></span>
                        </div>
                    </div>

                    <button onClick={handleSubmit} className="bg-green-600 text-white" >Tạo mới</button>
                    <div className='h-[500px]'>

                    </div>
                </div>
                <div className='w-[30%] flex-none'>
                    maps
                    <Loading />
                </div>
            </div>
        </div>
    )
}

export default CreatePost