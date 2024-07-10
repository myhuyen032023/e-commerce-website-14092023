import icons from './icons'
const {AiOutlineStar, AiFillStar} = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()

export const renderStarFromNumber = (number) => {
    if (!Number(number)) return
    const stars = []
    for (let i = 0; i<+number;i++) stars.push(<AiFillStar color='orange'/>)
    for (let i=5; i>+number;i--) stars.push(<AiOutlineStar color='orange'/>)
    return stars
}

export const validate = (payload, setInvalidField) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for (let arr of formatPayload) {
        if (arr[1]?.trim() === '') {
            invalids++
            setInvalidField(prev => [...prev, {name: arr[0], mes: "*** Require this field."}])
        }
    }

    for (let arr of formatPayload) {
        switch(arr[0]) {
            case 'email':
                if (!arr[1].match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                    invalids++;
                    setInvalidField(prev => [...prev, {name:arr[0], mes: '*** Invalid email'}])
                }
                break;
            case 'password':
                if (arr[1].length < 6) {
                    invalids++;
                    setInvalidField(prev => [...prev, {name: arr[0], mes: "*** Password must have at least 6 characters"}])
                }
                break;
            default: 
        }
    }
    return invalids
}

export const getBase64 = (file) => {
    if (!file) return ''
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}