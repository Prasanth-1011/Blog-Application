import {
    Compass,
    PlusCircle,
    User,
    LogOut,
    Edit3,
    Trash2,
    Search,
    Heart,
    MessageSquare,
} from "lucide-react";

export const IconExplore = Compass;
export const IconAdd = PlusCircle;
export const IconUser = User;
export const IconLogout = LogOut;
export const IconEdit = Edit3;
export const IconTrash = Trash2;
export const IconSearch = Search;
export const IconHeart = ({ className, filled }) => (
    <Heart className={className} fill={filled ? "currentColor" : "none"} />
);
export const IconMessageCircle = MessageSquare;
