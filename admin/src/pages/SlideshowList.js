import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteSlideShow, GetSlideShows, UpdateSlideShow, UpdateStatusSlideShow, resetState } from '../features/slideshows/slideshowSlice';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { DeleteImg } from '../features/uploadImage/uploadSlice';

const columns = [
  {
    title: <h5 className='fw-bold'>Id</h5>,
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: <h5 className='fw-bold'>Hinh</h5>,
    dataIndex: 'hinh',
  },
  {
    title: <h5 className='fw-bold'>Status</h5>,
    dataIndex: 'status',
  },
  {
    title: <h5 className='fw-bold'>Action</h5>,
    dataIndex: 'action',
  },
];

const SlideShows = () => {
  const [open, setOpen] = useState(false);
  const [slideshowId, setslideshowId] = useState("");
  const [imgId, setImgId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(GetSlideShows())
  }, []);
  const hideModal = () => {
    setOpen(false);
  };
  const slideShowState = useSelector(state => state?.slideshow?.slideshows)
  const data1 = [];
  for (let i = 0; i < slideShowState?.length; i++) {
    data1.push({
      key: i,
      id: slideShowState[i].id,
      hinh: (<img className='img-fluid w-25' src={slideShowState[i].imageUrl} />),
      status: (<>
        <select defaultValue={slideShowState[i]?.status}
          onChange={(e) => updateStatus(slideShowState[i]?.id, e.target.value)}
          name=""   className={`form-control form-select fw-bold ${slideShowState[i]?.status ? 'text-success' : 'text-danger'}`}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
      </>),
      action: (<>
        <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0'
          onClick={() => showModal(slideShowState[i].id, slideShowState[i].imagePublicId)}><AiFillDelete /></button>
      </>)
    });
  }
  const showModal = (a,b) => {
    setOpen(true);
    setslideshowId(a)
    setImgId(b)
  };
  const updateStatus = (a,b) => {
    dispatch(UpdateStatusSlideShow({id:a, status:b}))
    setTimeout(() => {
      dispatch(GetSlideShows())
    }, 300)
  }
  const deleteSlideShow = (a,b) => {
    dispatch(DeleteSlideShow(a))
    dispatch(DeleteImg(b))
    setOpen(false);
    setTimeout(() => {
      dispatch(GetSlideShows())
    }, 300)
  }
  return (
    <div>
      <h1 className='mb-4 fw-bold'>List of slideshows</h1>
      <div>
        <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
      </div>
      <CustomModal
        title="Are you sure you want to delete this slideshow?"
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteSlideShow(slideshowId, imgId) }}
      />
    </div>
  );
};

export default SlideShows;