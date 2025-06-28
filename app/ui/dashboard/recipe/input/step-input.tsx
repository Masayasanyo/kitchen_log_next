'use client';

import { useState } from 'react';
import Cancel from '@/app/ui/icons/cancel';
import {
  NewStep,
  ChildComponentProps,
} from '@/app/lib/definitions/definitions';
import PlusBtn from '@/app/ui/icons/plus-circle';

export default function StepInput({
  formData,
  setFormData,
}: ChildComponentProps) {
  const [newStep, setNewStep] = useState<NewStep>({
    name: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewStep({ ...newStep, name: e.target.value });
  };
  const applyNewStep = () => {
    if (!newStep.name) return;
    const newStepList = [...formData.stepList, { name: newStep.name }];
    setFormData({
      ...formData,
      stepList: newStepList,
    });
    setNewStep({ name: '' });
  };
  const handleStepChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const currentStepList = [...formData.stepList];
    currentStepList[index].name = e.target.value;
    setFormData({
      ...formData,
      stepList: currentStepList,
    });
  };
  const cancelStep = (index: number) => {
    let currentStepList = [...formData.stepList];
    currentStepList = currentStepList.filter((step, i) => i !== index);
    setFormData({
      ...formData,
      stepList: currentStepList,
    });
  };

  return (
    <label className="flex flex-col gap-1">
      手順
      <div className="grid grid-cols-9 mb-4 gap-2">
        <textarea
          name="step"
          className="col-span-8 bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
          placeholder="作り方を入力"
          value={newStep.name}
          onChange={handleChange}
        />
        <button type="button" onClick={applyNewStep} className="col-span-1">
          <PlusBtn
            design="w-8 h-8 bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] 
              hover:bg-[#32633f] active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {formData.stepList.map((step, index) => (
          <div key={index} className="w-full grid grid-cols-9 gap-2">
            <textarea
              name="step"
              className="col-span-8 bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
              value={step.name}
              onChange={(e) => handleStepChange(e, index)}
            />
            <button
              className="block col-span-1"
              type="button"
              onClick={() => cancelStep(index)}
            >
              <Cancel
                design="w-8 bg-[#CC3300] text-[#E8ECD7] shadow-[0_4px_0_#FF3366] hover:bg-[#FF3366] 
                  active:bg-[#FF3366] active:shadow-[0_3px_0_#FF3366]"
              />
            </button>
          </div>
        ))}
      </div>
    </label>
  );
}

// 'use client';

// import { useState } from 'react';
// import Trash from '@/app/ui/icons/trash';
// import {
//   NewStep,
//   ChildComponentProps,
//   SortItem,
// } from '@/app/lib/definitions/definitions';
// import PlusBtn from '@/app/ui/icons/plus-btn';
// import Grip from '@/app/ui/icons/grip';
// import { DndContext, DragEndEvent } from '@dnd-kit/core';
// import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
// import { v4 as uuidv4 } from 'uuid';

// export default function StepInput({
//   formData,
//   setFormData,
// }: ChildComponentProps) {
//   const [newStep, setNewStep] = useState<NewStep>({
//     id: uuidv4(),
//     name: '',
//   });
//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNewStep({ ...newStep, name: e.target.value });
//   };
//   const applyNewStep = () => {
//     if (!newStep.name) return;
//     const newStepList = [
//       ...formData.stepList,
//       { id: newStep.id, name: newStep.name },
//     ];
//     setFormData({
//       ...formData,
//       stepList: newStepList,
//     });
//     setNewStep({ id: uuidv4(), name: '' });
//   };
//   // const handleStepChange = (
//   //   e: React.ChangeEvent<HTMLTextAreaElement>,
//   //   index: number,
//   // ) => {
//   //   const currentStepList = [...formData.stepList];
//   //   currentStepList[index].name = e.target.value;
//   //   setFormData({
//   //     ...formData,
//   //     stepList: currentStepList,
//   //   });
//   // };

//   const handleStepChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement>,
//     index: number,
//   ) => {
//     const updatedStepList = formData.stepList.map((step, i) =>
//       i === index ? { ...step, name: e.target.value } : step,
//     );

//     setFormData({
//       ...formData,
//       stepList: updatedStepList,
//     });
//   };
//   const cancelStep = (index: number) => {
//     let currentStepList = [...formData.stepList];
//     currentStepList = currentStepList.filter((step, i) => i !== index);
//     setFormData({
//       ...formData,
//       stepList: currentStepList,
//     });
//   };

//   const handleDragEnd = (e: DragEndEvent) => {
//     const { active, over } = e;
//     if (!over || active.id === over.id) return;

//     const oldIndex = formData.stepList.findIndex(
//       (item) => item.id === active.id,
//     );
//     const newIndex = formData.stepList.findIndex((item) => item.id === over.id);

//     const newList = arrayMove(formData.stepList, oldIndex, newIndex);
//     setFormData({ ...formData, stepList: newList });
//   };

//   const SortableItem = ({ id, children }: SortItem) => {
//     const { attributes, listeners, setNodeRef, transform, transition } =
//       useSortable({ id });

//     const style = {
//       transform: transform
//         ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
//         : undefined,
//       transition,
//     };

//     return (
//       <div
//         className="w-full grid grid-cols-10 gap-2"
//         ref={setNodeRef}
//         style={style}
//       >
//         <div {...attributes} {...listeners} className="my-auto">
//           <Grip cN={'w-6 col-span-1 my-auto'} />
//         </div>
//         {children}
//       </div>
//     );
//   };

//   return (
//     <label className="flex flex-col gap-1">
//       手順
//       <div className="grid grid-cols-10 mb-4 gap-2">
//         <button type="button" onClick={applyNewStep} className="col-span-1">
//           <PlusBtn cN="block w-6 my-auto" />
//         </button>
//         <textarea
//           name="step"
//           className="col-span-8 bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
//           placeholder="作り方を入力"
//           value={newStep.name}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-col gap-1">
//         <DndContext onDragEnd={handleDragEnd}>
//           <SortableContext items={formData.stepList.map((step) => step.id)}>
//             {formData.stepList.map((step, index) => (
//               <SortableItem key={step.id} id={step.id}>
//                 <div className="col-span-9 w-full grid grid-cols-9 gap-2">
//                   <textarea
//                     name="step"
//                     className="col-span-8 bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
//                     value={step.name}
//                     onChange={(e) => handleStepChange(e, index)}
//                   />
//                   <button
//                     className="block col-span-1"
//                     type="button"
//                     onClick={() => cancelStep(index)}
//                   >
//                     <Trash width="w-6" />
//                   </button>
//                 </div>
//               </SortableItem>
//             ))}
//           </SortableContext>
//         </DndContext>
//       </div>
//     </label>
//   );
// }
