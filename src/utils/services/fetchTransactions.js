const fetchTransactions=async()=>{
    try{
        const response=await fetch('/dataSet/data.json'); 
        if(!response.ok){
            throw new Error(`Failed to fetch data:${response.status}`);
        }
        const data=await response.json();
        return data;

    }
    catch(error){
        console.error(`Error fetching transactions:` ,error);
        throw error;
    }
}

export default fetchTransactions;