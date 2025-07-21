'use client';

import { useState, useRef } from 'react';
import { RecipeForm, Tag } from '@/app/lib/definitions';
import PlusBtn from '@/app/ui/icons/plus-circle';
import Cancel from '@/app/ui/icons/cancel';

export default function RecipeTagInput({
  formData,
  setFormData,
}: {
  formData: RecipeForm;
  setFormData: React.Dispatch<React.SetStateAction<RecipeForm>>;
}) {
  const [newTag, setNewTag] = useState<Tag>({
    id: 0,
    recipeId: 0,
    name: '',
  });

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const submitNewTag = () => {
    if (!newTag.name) return;
    const newTagList = [
      ...formData.tagList,
      {
        id: 0,
        name: newTag.name,
        recipeId: 0,
      },
    ];
    setFormData((prev) => ({
      ...prev,
      tagList: newTagList,
    }));
    setNewTag({ id: 0, recipeId: 0, name: '' });
  };

  const handleTagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const currentTagList = [...formData.tagList];
    currentTagList[index].name = e.target.value;

    setFormData((prev) => ({
      ...prev,
      tagList: currentTagList,
    }));
  };

  const cancelTag = (index: number) => {
    let currentTagList = [...formData.tagList];
    currentTagList = currentTagList.filter((tag, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      tagList: currentTagList,
    }));
  };

  const dragTag = useRef<number>(0);
  const draggedOverTag = useRef<number>(0);
  const handleSort = () => {
    const tagClone = [...formData.tagList];
    const draggedItem = tagClone[dragTag.current];
    tagClone.splice(dragTag.current, 1);
    tagClone.splice(draggedOverTag.current, 0, draggedItem);
    setFormData((prev) => ({
      ...prev,
      tagList: tagClone,
    }));
  };

  return (
    <label className="flex flex-col gap-1">
      タグ
      <div className="grid grid-cols-9 gap-2 mb-4">
        <input
          name="newTagName"
          className="col-span-8 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
          type="text"
          placeholder="タグ名を入力"
          value={newTag.name}
          onChange={handleNewTagChange}
        />
        <button type="button" onClick={submitNewTag} className="col-span-1">
          <PlusBtn
            design="w-8 h-8 bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] 
              hover:bg-[#32633f] active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {formData.tagList?.map((tag, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-9 gap-2"
            draggable
            onDragStart={() => (dragTag.current = index)}
            onDragEnter={() => (draggedOverTag.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              name="tagName"
              className="col-span-8 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
              type="text"
              value={tag.name}
              onChange={(e) => handleTagChange(e, index)}
            />
            <button
              className="col-span-1 block"
              type="button"
              onClick={() => cancelTag(index)}
            >
              <Cancel
                design="w-8 bg-[#CC3300] text-[#E8ECD7] shadow-[0_3px_0_#FF3366] hover:bg-[#FF3366] 
                  active:bg-[#FF3366] active:shadow-[0_3px_0_#FF3366]"
              />
            </button>
          </div>
        ))}
      </div>
    </label>
  );
}
