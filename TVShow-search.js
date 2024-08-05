// API : https://api.tvmaze.com/search/shows?q=girls

document.querySelector("body").bgColor="bisque"

const formElement = document.querySelector("#searchForm")

formElement.addEventListener('submit', function (e) {  // ทุกครั้งที่ form นี้ถูก submit เราอยากให้ทำอะไร
    e.preventDefault()
    // ใช้ .dir เพื่อเปลี่ยนให้มันเป็น Object เพื่อดู property ของ element นี้แบบละเอียด 
    // จากนั้นเราก็สามารถเข้าถึง value ของมันแบบ Object ได้แล้ว
    // console.dir(formElement.elements.query.value); 
    const search = formElement.elements.query.value // จากด้านบนเราต้องการดึงค่าที่พิมพ์ในช่อง search มาไว้ในตัวแปรใหม่
    getMovieDetails(search) // เอา function ด้านล่างมา addEventListener
})

const getMovieDetails = async (search) => {
    try {
        const config = { params: { q: search } } // เรื่อง set headers แต่จะไม่มีบรรทัดนี้ก็ได้ 
        // แต่ด้านล่างใน axios.get ต้องเป็น (`https://api.tvmaze.com/search/shows?q=${search}`)
        const response = await axios.get(`https://api.tvmaze.com/search/shows`, config)
        renderImage(response.data) // ถ้าหาเจอ ให้ทำอันนี้ เอาค่ามาจาก function ด้านล่าง
    } catch (err) {
        console.log(err);
    }
}

// ทุกครั้งที่ search มันก็จะเอาอันที่มันหาเจออันแรกมาแสดง แล้ววางต่อกันไปเรื่อยๆ
// ถ้าอยากให้มันแสดงทั้งหมด ไม่ใช่แค่อันแรกที่เจอ เนื่องจากสิ่งที่เจอเป็น array เลยเอามา loop เพื่อ list

const renderImage = (data) => {
    for (let item of data) {
        if (item.show.image?.medium) { // หนังบางเรื่องอาจจะไม่มีภาพหน้าปก ดังนั้นต้อง if ดักไว้ 
            // แต่ตรง image ต้องใส่ "?" เพื่อดักว่าถ้าไม่เจอก็ไม่ต้องหา จะได้ไม่ error
            const imgElement = document.createElement('img') // สร้าง tag img
            imgElement.src = item.show.image.medium // ดึงที่อยู่ของ img ใน Object มาเก็บไว้ใน source 
            // โดย item คือ แต่ละอันที่หาเจอ (ถ้าเข้าถึงเฉพาะอันจะใช้เลข index เป็น response.data[0].show.image.medium)
            document.body.append(imgElement) // append tag img ที่สร้างไปไว้ใน body
        }
    }
}


