import Image from "next/image"
import Img from "@/assets/d_assets/prof.jpg"
const ProfileImg=({height,width}:any)=>{
    return <div>
        <Image className="rounded-full" src={Img} height={height} width={width} alt="profile"></Image>
    </div>
}
export default ProfileImg