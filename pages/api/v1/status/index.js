function status(request, response) {
    response.status(200).json({ message: "olá dev" })
}

export default status;