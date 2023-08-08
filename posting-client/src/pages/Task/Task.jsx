import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createTaskApi,
  deleteTaskApi,
  getTaskApi,
  getTaskDetailApi,
  increaseLike,
  updateTaskApi,
} from "../../redux/reducer/taskReducer";

export default function Home() {
  useEffect(() => {
    const action = getTaskApi();
    dispatch(action);
  }, []);
  const { task } = useSelector((state) => state.taskReducer);
  const { taskDetail } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();
  const [post, setPost] = useState({ title: "", description: "" });
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newValue = post;
    console.log(newValue);
    const action = createTaskApi(newValue);
    dispatch(action);
  };
  const frm = useFormik({
    initialValues: {
      id: taskDetail._id,
      title: taskDetail.title,
      description: taskDetail.description,
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      title: yup.string().required("Please fill in the form !"),
      description: yup.string().required("Please fill in the form !"),
    }),
    onSubmit: (update) => {
      console.log(update);
      const action = updateTaskApi(update.id, update.title, update.description);
      dispatch(action);
    },
  });
  return (
    <div className="post py-5">
      <iframe
        width="1920px"
        height="1080px"
        src="https://www.youtube.com/embed/zCLOJ9j1k2Y?autoplay=1&mute=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div className="container">
        <div className="title-page border border-3 border-primary text-center bg-light rounded-pill py-1">
          <h3 className="fw-bold fs-1 lh-2 text-primary">Routine</h3>
        </div>
        <div className="main pt-3">
          <div className="row">
            <div className="content d-flex flex-wrap col-9">
              {task.map((item, index) => {
                return (
                  <div className="card-item col-md-6 col-lg-4 p-2">
                    <div className="card rounded">
                      <img
                        className="rounded-top"
                        src={`https://picsum.photos/300/200/?random=${index}`}
                        alt="..."
                      />
                      <div className="card-body row">
                        <div className="left col-6">
                          <h5 className="fst-italic fw-semibold text-primary">
                            {item.title}
                          </h5>
                          <p className="fw-normal">{item.description}</p>
                        </div>
                        <div className="right text-end col-6">
                          <span
                            style={{
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={() => {
                              //Increase Heart
                              const action = increaseLike({
                                id: item._id,
                                like: 1,
                              });
                              dispatch(action);
                            }}
                          >
                            <i class="fa fa-heart"></i> {item.like}
                          </span>
                        </div>
                      </div>
                      <div className="row p-2 flex-row">
                        <div className="edit col-6">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            //Edit post
                            onClick={() => {
                              dispatch(getTaskDetailApi(item._id));
                            }}
                          >
                            <span>
                              <i class="fa-regular fa-pen-to-square"></i>
                            </span>
                          </button>
                        </div>
                        <div className="delete text-end col-6">
                          <button
                            type="submit"
                            className="btn btn-danger"
                            //Delete post
                            onClick={() => {
                              dispatch(deleteTaskApi(item._id));
                            }}
                          >
                            <span>
                              <i class="fa-solid fa-trash"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="create col-3 pt-2">
              <div className="form-outline bg-primary rounded p-3 ">
                <div className="create-posting">
                  <form onSubmit={handleSubmit}>
                    <input
                      id="title"
                      name="title"
                      className="form-control border title my-3"
                      placeholder="Title"
                      onChange={handleChange}
                    />
                    <input
                      id="description"
                      name="description"
                      className="form-control border description my-3"
                      placeholder="Description"
                      onChange={handleChange}
                    />
                    <div className="button1 text-center">
                      <button type="submit" className="btn">
                        <span>Create a post</span>
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                  style={{ display: "none" }}
                >
                  <div className="modal-dialog">
                    <div className="modal-content ">
                      <div className="modal-header ">
                        <h1
                          className="modal-title fw-bold fs-5"
                          id="exampleModalLabel"
                        >
                          Edit
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <form onSubmit={frm.handleSubmit}>
                        <div className="modal-body">
                          <div className="form-group mb-3">
                            <span className="text-primary fw-semibold ">
                              Title:
                            </span>
                            <input
                              className="form-control mb-4"
                              id="title"
                              name="title"
                              value={frm.values.title}
                              onChange={frm.handleChange}
                              onBlur={frm.handleBlur}
                            />
                            <span className="text-primary fw-semibold">
                              Description:
                            </span>
                            <input
                              className="form-control"
                              id="description"
                              name="description"
                              value={frm.values.description}
                              onChange={frm.handleChange}
                              onBlur={frm.handleBlur}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn bg-danger text-white "
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn bg-primary text-white"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
