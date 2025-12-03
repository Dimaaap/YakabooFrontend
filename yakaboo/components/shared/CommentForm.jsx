import { validationRules } from "../../services";

export const CommentForm = ({ register, errors }) => {
  return (
    <div className="checkout__form">
      <h5 className="checkout__form-title">Коментар до замовлення</h5>

      <textarea
        className={`checkout__form-textarea ${errors.comment ? 'error-input' : ''}`}
        rows={3}
        {...register('comment', validationRules.comment)}
      ></textarea>
      {errors.comment && (
        <p className="checkout__form-error-message">{errors.comment.message}</p>
      )}
    </div>
  );
};
