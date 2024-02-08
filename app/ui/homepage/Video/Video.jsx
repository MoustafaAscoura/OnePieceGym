'use client'
import { useState, useEffect } from "react";

export default function Video () {
    const [settings, setSettings] = useState(false)

    useEffect(()=>{
      fetch(`/api/settings`, { next: { tags: ['settings'] } })
      .then((response)=>{
          if (response.ok) {
              return response.json();
          }
          throw new Error('Something went wrong');
      })
      .then((responseJson) => {setSettings(responseJson)})
      .catch((e)=>console.log(e))
    },[])

    return ( settings?.video? <section>
            <script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"></script>
            <div className="fb-video" data-href={settings.video}  
            data-allowfullscreen="true" data-width="1920"></div>
        </section>:<></>)
}