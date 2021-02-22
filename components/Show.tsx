import React, { FC, Dispatch, SetStateAction } from 'react';

interface Props {
  show: string;
  setShow: Dispatch<SetStateAction<string>>;
}

const Show: FC<Props> = ({ show, setShow }) => {
  return (
    <div>
      <strong>Show:</strong>
      <input
        type='radio'
        id='all'
        name='show'
        value='all'
        checked={show === 'all'}
        onChange={e => setShow(e.target.value)}
      />
      <label htmlFor='all'>All</label>
      <input
        type='radio'
        id='wip'
        name='show'
        value='wip'
        checked={show === 'wip'}
        onChange={e => setShow(e.target.value)}
      />
      <label htmlFor='wip'>In Progress</label>
      <input
        type='radio'
        id='done'
        name='show'
        value='done'
        checked={show === 'done'}
        onChange={e => setShow(e.target.value)}
      />
      <label htmlFor='done'>Done</label>
    </div>
  );
};

export default Show;
