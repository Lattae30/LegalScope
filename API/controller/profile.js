import User from '../models/user.model.js';

// Helper function to send responses
const sendResponse = (res, statusCode, status, data, message) => {
    res.status(statusCode).json({
        status,
        data,
        message
    });
};

export async function updateProfile(req, res){
    const {firstName, lastName} = req.body;
    const profilePicture = req.file ? req.file.path : null;    

    try {
        const updatedData = {firstName, lastName};
        if(profilePicture) updatedData.profilePicture = profilePicture;

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, {new : true});
        if (!updatedUser || null) {
            return sendResponse(res, 404, 'failed', [], 'User not found');
        }
        const {password, email, ...user_data} = updatedUser._doc;
        sendResponse(res, 200, "success", user_data, "Profile updated sucessfully" )
    } catch (err) {
        console.error(err);
        sendResponse(res, 500, "error occurred", [], "internal server error")
    }
}

export async function readProfile(req, res) {
    try {
        // Ensure to use the correct model and reference
        const user = await User.findById(req.user._id).select("-password");
        
        if (!user) {
            return sendResponse(res, 404, "failed", [], "User not found");
        }
        
        // Send the user data in the response
        sendResponse(res, 200, "success", user, "Profile fetched successfully");
        
    } catch (err) {
        console.error(err);
        sendResponse(res, 500, "error", [], "Internal server error");
    }
}


