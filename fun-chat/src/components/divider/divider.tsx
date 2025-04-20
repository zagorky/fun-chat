import React from 'react';

type DividerProps = {
  ref: React.Ref<HTMLDivElement>;
};

export const Divider = (props: DividerProps) => {
  return (
    <div ref={props.ref} className="relative py-2">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-pink-700"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-xs text-emerald-700 font-medium">New messages</span>
      </div>
    </div>
  );
};
