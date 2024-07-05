async function logoutUser(request, response) {
    try {
        response.clearCookie('token');
        return response.status(200).json({
            message: 'Logout successful',
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = logoutUser;
