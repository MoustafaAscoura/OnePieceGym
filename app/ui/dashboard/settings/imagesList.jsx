
import { useDispatch } from 'react-redux';
import { addToImages, removeFromImages } from '@/app/lib/store/slices/settingsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

export default function ImageListViewer({ImagesList}) {
    const dispatch = useDispatch()

    const handleFileChange = (e) => {
        const formData = new FormData()
        formData.append("image",e.target.files[0])
    
        fetch('https://api.imgbb.com/1/upload?key=19eef0c30d4e456159d5e0b43f9f632b', 
          {method: 'POST', body: formData})
        .then(res => res.json())
        .then(jsonResponse => {
            dispatch(addToImages(jsonResponse.data.url))
        })
        .catch(err => console.log(err));
      }

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {ImagesList.map((item, index) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=248&fit=crop&auto=format`}
            loading="lazy"
          />
          <ImageListItemBar
            actionIcon={
                <DeleteIcon color='error' onClick={()=>dispatch(removeFromImages(index))}/>
            }
          />
        </ImageListItem>
      ))}
        <ImageListItem>
            <label for="dropzone-file" class="flex flex-col items-center justify-center p-4 w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 ">Click to upload</p>
                    <p class="text-xs text-gray-500 ">SVG, PNG, JPG or GIF</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={handleFileChange} />
            </label>
        </ImageListItem>
    </ImageList>
  );
}