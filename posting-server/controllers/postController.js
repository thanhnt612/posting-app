import { PostModel } from '../model/PostModel.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await PostModel.findById(id)
    if (!post) {
      return res.status(404).json({
        message: `No post with id: ${id}`
      })
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = req.body;
    const post = new PostModel(newPost);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await PostModel.findByIdAndUpdate(
      {
        _id: id
      },
      req.body,
      {
        new: true,
        runValidators: true
      })
    if (!post) {
      return res.status(404).json({
        message: `No post with id: ${id}`
      })
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await PostModel.findByIdAndDelete(id)
    if (!post) {
      return res.status(404).json({
        message: `No post with id: ${id}`
      })
    }
    res.status(200).json({
      message: "Deleted post !!!"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};