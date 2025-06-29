'use client';

import Image from 'next/image';
import { ChildComponentProps } from '@/app/lib/definitions/definitions';

export default function ImgInput({
  formData,
  setFormData,
}: ChildComponentProps) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        imgUrl: URL.createObjectURL(file),
        imgFile: file,
      });
    }
  };

  return (
    <label className="flex flex-col gap-1">
      写真
      <input
        name="image"
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        className="bg-[#1F4529] text-[#ffffff] px-4 py-2 rounded-2xl text-[12px] w-[200px]"
        onChange={(e) => handleChange(e)}
      />
      <Image
        width={160}
        height={90}
        src={formData.imgUrl || '/no_image.png'}
        alt="recipe image preview"
        unoptimized
        className="border-[#1F4529] border-2 rounded-2xl w-full object-cover aspect-video"
      />
    </label>
  );
}
