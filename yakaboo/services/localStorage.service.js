export class LocalStorageWorker {

    static set(name, value){
        try {
            localStorage.setItem(name, value)
            return true
        } catch(error){
            return false
        }
    }

    static get(name){
        return localStorage.getItem(name)
    }

    static delete(name){
        try{
            localStorage.removeItem(name);
            return true;
        } catch(error){
            return false
        }
    }
}