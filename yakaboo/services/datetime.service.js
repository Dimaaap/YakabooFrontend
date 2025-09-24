export class DateTime{
    getTimeLeft(endDate){
        console.log(endDate)
        const now = new Date();
        const end = new Date(endDate);
        const diff = end - now;

        if(!endDate) return;

        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return `${days} днів, ${hours} годин, ${minutes} хвилин`
    }

    dateFormat(inputDate){
        if(inputDate){
            const date = new Date(inputDate);
            const formattedDate = `${date.getDate().toString()
                .padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${(date.getFullYear())}`
            return formattedDate;
        } else {
            return ""
        }
    }
}