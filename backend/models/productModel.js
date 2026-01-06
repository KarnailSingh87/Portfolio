import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Mixed }, // allow string or number

    image: { type: Array, required: true },

    category: { type: String, required: true },
    subCategory: { type: String, required: true },

    sizes: {
        type: [{
            size: { type: String, required: true },
            price: { type: mongoose.Schema.Types.Mixed, required: true }, // ✅ fixed here
        }, ],
        validate: {
            validator: (val) => val.length > 0,
            message: "At least one size is required",
        },
    },

    bestseller: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

const productModel =
    mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;