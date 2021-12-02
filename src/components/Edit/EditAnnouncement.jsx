import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { editAnnouncement, getAnnouncementById } from '../../store/slice/announcement-slice';
import './EditAnnouncement.scss';
import { SelectSingle } from '../../store/slice/announcement-selector';

const EditAnnouncement = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  dispatch(getAnnouncementById(Number(id)));
  const announcement = useSelector(SelectSingle);

  const onSubmit = (data) => {
    const editedAnnouncement = { ...data, id: Number(id) };

    if (editedAnnouncement.title && editedAnnouncement.description && editedAnnouncement.dateAdded) {
      dispatch(editAnnouncement(editedAnnouncement));
      navigate('/');
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>{`Edit post ${id}`}</h1>
      <label>
        Title:
        <input {...register('title', { required: true })} defaultValue={announcement.title} />
        {errors.title && <span className="error">This field is required</span>}
      </label>
      <label>
        Description:
        <textarea {...register('description', { required: true })} defaultValue={announcement.description} />
        {errors.description && <span className="error">This field is required</span>}
      </label>
      <label>
        Date added:
        <input type="date" min="2020-01-01" max="2025-01-01" {...register('dateAdded', { required: true, max: 10 })} defaultValue={announcement.dateAdded} />
        {errors.dateAdded && <span className="error">This field is required</span>}
      </label>
      <button
        className="edit-button"
        type="submit"
      >
        Edit announcement
      </button>
    </form>
  );
};

export default EditAnnouncement;
