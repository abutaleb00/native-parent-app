import axios from 'axios';
import {
  NEXT_PUBLIC_MEDIA_SERVER_HOST,
  NEXT_PUBLIC_MEDIA_SERVER_KEY,
} from '../../env.json';
import generalAPI from '../api/general';
import {MediaType} from '../api/type/generalType';
type Params = {
  formData: FormData;
  folder?: string | number;
  type: string;
  source: string;
};

//source Lesson, Activity, Gallery, pickup person
//type   DOCUMENT IMAGE VIDEO AUDIO

// : Promise<number | number[]>
export async function upload({
  formData,
  type = 'IMAGE',
  source,
  folder = undefined,
}: Params) {
  const msUrl = new URL(NEXT_PUBLIC_MEDIA_SERVER_HOST);
  try {
    const {data} = await axios.post(msUrl.toString(), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: NEXT_PUBLIC_MEDIA_SERVER_KEY ?? '',
        folder: folder,
      },
    });

    if (data.length == 1) {
      let array: number[] = [];
      const id = await updateMedia({
        source: source,
        type: type,
        url: data[0].url,
      });
      array.push(id);
      return array;
    } else {
      let array: number[] = [];
      for (let i = 0; i < data.length; i++) {
        const id = await updateMedia({
          source: source,
          type: type,
          url: data[i].url,
        });
        array.push(id);
      }

      return array;
    }
  } catch (err) {
    console.log((err as Error).message);
    throw err;
  }
}

const updateMedia = async ({source, type, url}: MediaType) => {
  const data = {source, type, url};
  try {
    const res = await generalAPI.submitMedia(data);
    if (res.success) {
      const media = res.data;
      return media.id;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
