const mongoose = include('mongoose');

const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    totalScreens: { type: Number, required: true },
    amenities: [{ type: String, required: false }],
    managerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: false },
    openingHours: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    websiteUrl: { type: String, required: false }
}, {
    timestamps: true
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports - Theater;