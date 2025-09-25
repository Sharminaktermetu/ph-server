import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// const createStudent = catchAsync(async (req, res) => {
//   const { password, student: studentData } = req.body;

//   const result = await UserServices.createStudentIntoDB(
//     req.file,
//     password,
//     studentData,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student is created successfully',
//     data: result,
//   });
// });

const createBuyer = catchAsync(async (req, res) => {


const {file, password, ...payload} =req.body
  const result = await UserServices.createBuyerIntoDB(   
file, password, payload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer is created successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});
export const UserControllers = {
 createBuyer,
  getMe,
  changeStatus,
};
