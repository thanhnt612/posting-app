import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  task: [],
  taskDetail: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getTask: (state, action) => {
      state.task = action.payload;
    },
    getTaskDetail: (state, action) => {
      state.taskDetail = action.payload;
    },
    increaseLike: (state, action) => {
      const { id, like } = action.payload;
      const item = state.task.find((taskLike) => taskLike._id === id);
      item.like += like;
    },
  },
});

export const { increaseLike, getTask, getTaskDetail } = userReducer.actions;

export default userReducer.reducer;

export const createTaskApi = (post) => {
  return async (dispatch) => {
    let result = await http.post("/posts", post);
    dispatch(getTaskApi());
  };
};

export const getTaskApi = () => {
  return async (dispatch) => {
    let result = await http.get("/posts");
    const action = getTask(result.data);
    dispatch(action);
  };
};

export const getTaskDetailApi = (id) => {
  return async (dispatch) => {
    let result = await http.get("/posts/" + id);
    const action = getTaskDetail(result.data);
    dispatch(action);
  };
};
export const deleteTaskApi = (id) => {
  return async (dispatch) => {
    let result = await http.delete("/posts/" + id);
    console.log("Delete Api !!!");
    dispatch(getTaskApi());
  };
};
export const updateTaskApi = (id, title, description) => {
  return async (dispatch) => {
    let result = await http.put("/posts/" + id, {
      title: title,
      description: description,
    });
    console.log("Updated task !!!");
    dispatch(getTaskApi());
  };
};
