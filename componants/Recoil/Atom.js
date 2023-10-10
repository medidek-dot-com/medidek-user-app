import { atom  } from "recoil";

 export const Userdata =atom({
    key:"Userdata",
    default: [],
})

export const UserId =atom({
    key:"UserId",
    default:""
})

export const Usertoken =atom({
    key:"Usertoken",
    default:""
})

export const Userlocation =atom({
    key:"Userlocation",
    default:""
})

export const UserselectedHospital =atom({
    key:"UserslectedHospital",
    default:""
})

export const UserConformationmasseage =atom({
    key:"UserConformationmasseage",
    default:[]
})
 export const UserDataForCreateAccount=atom({
    key:"UserDataForCreateAccount",
    default:[]
 })


 export const UserEmailForResetThePassword=atom({
    key:"UserEmailForResetThePassword",
    default:""
 })
