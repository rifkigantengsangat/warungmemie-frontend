export const PostData =async (id,menu_id,jumlah,total)=>{
    const config = {
        user_id :id,
        menu_id :menu_id,
        jumlah_pesanan :jumlah,
        total_harga :total
    }
  await axios.post('http://localhost:8000/pesanan',config);
}