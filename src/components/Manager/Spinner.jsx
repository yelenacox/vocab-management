import { Spin } from 'antd';
import './Spinner.scss';
export const Spinner = () => {
  return (
    <div className="loading_screen">
      <div className="spinner">
        <Spin />
      </div>
    </div>
  );
};
