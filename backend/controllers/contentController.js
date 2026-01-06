import contentModel from "../models/contentModel.js";

export const getContent = async (req, res) => {
  try {
    const { key } = req.params;
    const doc = await contentModel.findOne({ key });
    return res.json({ success: true, data: doc ? doc.data : null });
  } catch (error) {
    console.error("Get Content Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load content" });
  }
};

export const upsertContent = async (req, res) => {
  try {
    const { key } = req.params;
    const { data } = req.body;

    if (!data || typeof data !== "object") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid content payload" });
    }

    const doc = await contentModel.findOneAndUpdate(
      { key },
      { data },
      { new: true, upsert: true }
    );

    return res.json({ success: true, data: doc.data });
  } catch (error) {
    console.error("Upsert Content Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save content" });
  }
};
