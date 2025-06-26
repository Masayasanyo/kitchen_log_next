'use client';

import { useState } from 'react';
import Trash from '@/app/ui/icons/trash';
import { NewIng, ChildComponentProps } from '@/app/lib/definitions/definitions';
import PlusBtn from '@/app/ui/icons/plus-btn';

export default function IngInput({
  formData,
  setFormData,
}: ChildComponentProps) {
  const [newIng, setNewIng] = useState<NewIng>({
    name: '',
    amount: '',
    unit: 'g',
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (e.target.name === 'ingName') {
      setNewIng({
        ...newIng,
        name: e.target.value,
      });
    }
    if (e.target.name === 'ingAmount') {
      setNewIng({
        ...newIng,
        amount: e.target.value,
      });
    }
    if (e.target.name === 'ingUnit') {
      setNewIng({
        ...newIng,
        unit: e.target.value,
      });
    }
  };
  const applyNewIng = () => {
    if (!newIng.name) return;
    const newIngList = [
      ...formData.ingList,
      {
        name: newIng.name,
        amount: newIng.amount,
        unit: newIng.unit,
      },
    ];
    setFormData({
      ...formData,
      ingList: newIngList,
    });
    setNewIng({ name: '', amount: '', unit: 'g' });
  };
  const handleIngChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const currentIngList = [...formData.ingList];
    if (e.target.name === 'ingName') {
      currentIngList[index].name = e.target.value;
    }
    if (e.target.name === 'ingAmount') {
      currentIngList[index].amount = e.target.value;
    }
    if (e.target.name === 'ingUnit') {
      currentIngList[index].unit = e.target.value;
    }
    setFormData({
      ...formData,
      ingList: currentIngList,
    });
  };
  const cancelIng = (index: number) => {
    let currentIngList = [...formData.ingList];
    currentIngList = currentIngList.filter((ing, i) => i !== index);
    setFormData({
      ...formData,
      ingList: currentIngList,
    });
  };

  return (
    <label className="flex flex-col gap-1">
      材料
      <div className="grid grid-cols-9 gap-2 mb-4">
        <input
          name="ingName"
          className="col-span-4 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
          type="text"
          placeholder="材料名を入力"
          value={newIng.name}
          onChange={handleChange}
        />
        <input
          name="ingAmount"
          className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
          type="text"
          placeholder="量を入力"
          value={newIng.amount}
          onChange={handleChange}
        />
        <select
          name="ingUnit"
          className="col-span-2 border p-2 rounded"
          value={newIng.unit}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="mL">mL</option>
          <option value="L">L</option>
          <option value="大さじ">大さじ</option>
          <option value="小さじ">小さじ</option>
          <option value="カップ">カップ</option>
          <option value="個">個</option>
          <option value="本">本</option>
          <option value="枚">枚</option>
          <option value="片">片</option>
          <option value="適量">適量</option>
          <option value="少々">少々</option>
          <option value="その他">その他</option>
        </select>
        <button type="button" onClick={applyNewIng} className="col-span-1">
          <PlusBtn cN="block w-6 mr-auto" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {formData.ingList?.map((ing, index) => (
          <div key={index} className="w-full grid grid-cols-9 gap-2">
            <input
              name="ingName"
              className="col-span-4 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
              type="text"
              value={ing.name}
              onChange={(e) => handleIngChange(e, index)}
            />
            <input
              name="ingAmount"
              className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
              type="text"
              value={ing.amount}
              onChange={(e) => handleIngChange(e, index)}
            />
            <select
              name="ingUnit"
              className="col-span-2 border p-2 rounded"
              value={ing.unit}
              onChange={(e) => handleIngChange(e, index)}
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="mL">mL</option>
              <option value="L">L</option>
              <option value="大さじ">大さじ</option>
              <option value="小さじ">小さじ</option>
              <option value="カップ">カップ</option>
              <option value="個">個</option>
              <option value="本">本</option>
              <option value="枚">枚</option>
              <option value="片">片</option>
              <option value="適量">適量</option>
              <option value="少々">少々</option>
              <option value="その他">その他</option>
            </select>
            <button
              className="col-span-1 block"
              type="button"
              onClick={() => cancelIng(index)}
            >
              <Trash width="w-6" />
            </button>
          </div>
        ))}
      </div>
    </label>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import Trash from '@/app/ui/icons/trash';
// import {
//   NewIng,
//   ChildComponentProps,
//   SortItem,
// } from '@/app/lib/definitions/definitions';
// import PlusBtn from '@/app/ui/icons/plus-btn';
// import Grip from '@/app/ui/icons/grip';
// import { DndContext, DragEndEvent } from '@dnd-kit/core';
// import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';

// export default function IngInput({
//   formData,
//   setFormData,
// }: ChildComponentProps) {
//   const [newIng, setNewIng] = useState<NewIng>({
//     name: '',
//     amount: '',
//     unit: 'g',
//     order: 1,
//   });
//   const handleChange = (
//     e:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     if (e.target.name === 'ingName') {
//       setNewIng({
//         ...newIng,
//         name: e.target.value,
//       });
//     }
//     if (e.target.name === 'ingAmount') {
//       setNewIng({
//         ...newIng,
//         amount: e.target.value,
//       });
//     }
//     if (e.target.name === 'ingUnit') {
//       setNewIng({
//         ...newIng,
//         unit: e.target.value,
//       });
//     }
//   };
//   const applyNewIng = () => {
//     if (!newIng.name) return;
//     const lastOrder = formData.ingList.length;
//     const newIngList = [
//       ...formData.ingList,
//       {
//         name: newIng.name,
//         amount: newIng.amount,
//         unit: newIng.unit,
//         order: lastOrder + 1,
//       },
//     ];
//     setFormData({
//       ...formData,
//       ingList: newIngList,
//     });
//     setNewIng({ name: '', amount: '', unit: 'g', order: 1 });
//   };
//   const handleIngChange = (
//     e:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.ChangeEvent<HTMLSelectElement>,
//     order: number,
//   ) => {
//     const currentIngList = [...formData.ingList];
//     if (e.target.name === 'ingName') {
//       currentIngList[order - 1].name = e.target.value;
//     }
//     if (e.target.name === 'ingAmount') {
//       currentIngList[order - 1].amount = e.target.value;
//     }
//     if (e.target.name === 'ingUnit') {
//       currentIngList[order - 1].unit = e.target.value;
//     }
//     setFormData({
//       ...formData,
//       ingList: currentIngList,
//     });
//   };
//   const cancelIng = (o: number) => {
//     let currentIngList = [...formData.ingList];
//     currentIngList = currentIngList.filter((ing, i) => i !== o - 1);
//     for (let i = 0; i < currentIngList.length; i++) {
//       currentIngList[i].order = i + 1;
//     }
//     setFormData({
//       ...formData,
//       ingList: currentIngList,
//     });
//   };

//   const handleDragEnd = (e: DragEndEvent) => {
//     const { active, over } = e;
//     if (active.id !== over?.id) {
//       const oldIndex = formData.ingList.findIndex(
//         (ing) => ing.order === active.id,
//       );
//       const newIndex = formData.ingList.findIndex(
//         (ing) => ing.order === over?.id,
//       );
//       const newList = arrayMove(formData.ingList, oldIndex, newIndex).map(
//         (ing, index) => ({ ...ing, order: index + 1 }),
//       );
//       setFormData({
//         ...formData,
//         ingList: newList,
//       });
//     }
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
//       材料
//       <div className="grid grid-cols-10 gap-2 mb-4">
//         <button type="button" onClick={applyNewIng} className="col-span-1">
//           <PlusBtn cN="block w-6 mr-auto" />
//         </button>
//         <input
//           name="ingName"
//           className="col-span-4 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
//           type="text"
//           placeholder="材料名を入力"
//           value={newIng.name}
//           onChange={handleChange}
//         />
//         <input
//           name="ingAmount"
//           className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
//           type="text"
//           placeholder="量を入力"
//           value={newIng.amount}
//           onChange={handleChange}
//         />
//         <select
//           name="ingUnit"
//           className="col-span-2 border p-2 rounded"
//           value={newIng.unit}
//           onChange={(e) => {
//             handleChange(e);
//           }}
//         >
//           <option value="g">g</option>
//           <option value="kg">kg</option>
//           <option value="mL">mL</option>
//           <option value="L">L</option>
//           <option value="大さじ">大さじ</option>
//           <option value="小さじ">小さじ</option>
//           <option value="カップ">カップ</option>
//           <option value="個">個</option>
//           <option value="本">本</option>
//           <option value="枚">枚</option>
//           <option value="片">片</option>
//           <option value="適量">適量</option>
//           <option value="少々">少々</option>
//           <option value="その他">その他</option>
//         </select>
//       </div>
//       <div className="flex flex-col gap-1">
//         <DndContext onDragEnd={handleDragEnd}>
//           <SortableContext items={formData.ingList.map((ing) => ing.order)}>
//             {formData.ingList?.map((ing, index) => (
//               <SortableItem key={ing.order} id={ing.order}>
//                 <div className="col-span-9 grid grid-cols-9 gap-2">
//                   <input
//                     name="ingName"
//                     className="col-span-4 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
//                     type="text"
//                     value={ing.name}
//                     onChange={(e) => handleIngChange(e, ing.order)}
//                   />
//                   <input
//                     name="ingAmount"
//                     className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
//                     type="text"
//                     value={ing.amount}
//                     onChange={(e) => handleIngChange(e, ing.order)}
//                   />
//                   <select
//                     name="ingUnit"
//                     className="col-span-2 border p-2 rounded"
//                     value={ing.unit}
//                     onChange={(e) => handleIngChange(e, ing.order)}
//                   >
//                     <option value="g">g</option>
//                     <option value="kg">kg</option>
//                     <option value="mL">mL</option>
//                     <option value="L">L</option>
//                     <option value="大さじ">大さじ</option>
//                     <option value="小さじ">小さじ</option>
//                     <option value="カップ">カップ</option>
//                     <option value="個">個</option>
//                     <option value="本">本</option>
//                     <option value="枚">枚</option>
//                     <option value="片">片</option>
//                     <option value="適量">適量</option>
//                     <option value="少々">少々</option>
//                     <option value="その他">その他</option>
//                   </select>
//                   <button
//                     className="col-span-1 block"
//                     type="button"
//                     onClick={() => cancelIng(ing.order)}
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
