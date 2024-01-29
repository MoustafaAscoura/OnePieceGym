export default function Video () {
    return <section>
        {/* <div className="facebook-responsive relative overflow-hidden h-screen">
            <iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100091909050335%2Fvideos%2F909888353436782%2F&show_text=false&width=560&t=0" 
            width="100%" height="100%" className="absolute border-0 h-fit" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
        </div> */}
            <div className="fb-video" data-href="https://www.facebook.com/100091909050335/videos/909888353436782"  
            data-allowfullscreen="true" data-width="1920"></div>
        </section>
}