import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {

  const {selectedUser, messages}= useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  // Get all the image from the messages and set them to state
  
  useEffect(()=>{
    setMsgImages(
      messages.filter(msg=> msg.image).map(msg=>msg.image)
    )
  },[messages])

  return  selectedUser && (
<div
  className={`bg-[#8185b2]/10 text-white w-full relative overflow-y-scroll ${
    selectedUser ? "max-md:hidden" : ""
  }`}
>
  <div className="pt-8 flex flex-col items-center gap-2 mx-auto">
    {/* Profile Picture */}
    <img
      src={selectedUser?.profilePic || assets.avatar_icon}
      alt=""
      className="w-16 aspect-[1/1] rounded-full object-cover"
    />

    {/* Name with green dot */}
    <h1 className="flex items-center gap-2 text-base font-semibold px-8">
      {onlineUsers.includes(selectedUser._id) && 
      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>}
      {selectedUser?.fullName}
    </h1>

    {/* Bio */}
    <p className="px-6 mx-auto text-xs text-gray-300 text-center">
      {selectedUser?.bio}
    </p>
  </div>

  {/* Divider */}
  <hr className="border-[#ffffff50] my-3" />

  {/* Media Section */}
  <div className="px-5 text-xs">
    <p>Media</p>
    <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-3 opacity-80">
      {msgImages.map((url, index) => (
        <div
          key={index}
          onClick={() => window.open(url)}
          className="cursor-pointer rounded"
        >
          <img src={url} alt="" className="h-full rounded-md" />
        </div>
      ))}
    </div>
  </div>

  {/* Logout Button */}
  <button onClick={()=> logout()}
    className="absolute bottom-5 left-1/2 transform -translate-x-1/2 
      bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none
      text-sm font-medium py-2 px-16 rounded-full cursor-pointer"
  >
    Logout
  </button>
</div>

  )
}

export default RightSidebar
