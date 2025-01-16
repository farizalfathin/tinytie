import Posting from "@/components/Posting";
import RenderList from "@/components/others/RenderList";
import LayoutSidebar from "@/components/templates/LayoutSidebar";
import AvatarFriend from "@/components/AvatarFriend";

type DataFriend = {
  name: string;
  avatar: string;
  fallback: string;
};

const dataFriend: DataFriend[] = [
  {
    name: "friend 1",
    avatar:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/112fdda4-3732-4250-8e6d-af983aea1528/dffxj6r-3432fc5d-15fe-4b2c-8cf8-107bee34638a.jpg/v1/fill/w_894,h_894,q_70,strp/nagumo_from_sakamoto_days__by_nivet2006_dffxj6r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzExMmZkZGE0LTM3MzItNDI1MC04ZTZkLWFmOTgzYWVhMTUyOFwvZGZmeGo2ci0zNDMyZmM1ZC0xNWZlLTRiMmMtOGNmOC0xMDdiZWUzNDYzOGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HD4Kqgp9Nu6Wg-rvnV1F774i0pw5cBJ1c3HA0EEJE8w",
    fallback: "F1",
  },
  {
    name: "friend 2",
    avatar: "",
    fallback: "F2",
  },
  {
    name: "friend 3",
    avatar: "",
    fallback: "F3",
  },
  {
    name: "friend 4",
    avatar: "",
    fallback: "F4",
  },
  {
    name: "friend 5",
    avatar: "",
    fallback: "F5",
  },
  {
    name: "friend 1",
    avatar:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/112fdda4-3732-4250-8e6d-af983aea1528/dffxj6r-3432fc5d-15fe-4b2c-8cf8-107bee34638a.jpg/v1/fill/w_894,h_894,q_70,strp/nagumo_from_sakamoto_days__by_nivet2006_dffxj6r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzExMmZkZGE0LTM3MzItNDI1MC04ZTZkLWFmOTgzYWVhMTUyOFwvZGZmeGo2ci0zNDMyZmM1ZC0xNWZlLTRiMmMtOGNmOC0xMDdiZWUzNDYzOGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HD4Kqgp9Nu6Wg-rvnV1F774i0pw5cBJ1c3HA0EEJE8w",
    fallback: "F1",
  },
  {
    name: "friend 2",
    avatar: "",
    fallback: "F2",
  },
  {
    name: "friend 3",
    avatar: "",
    fallback: "F3",
  },
  {
    name: "friend 4",
    avatar: "",
    fallback: "F4",
  },
  {
    name: "friend 5",
    avatar: "",
    fallback: "F5",
  },
  {
    name: "friend 1",
    avatar:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/112fdda4-3732-4250-8e6d-af983aea1528/dffxj6r-3432fc5d-15fe-4b2c-8cf8-107bee34638a.jpg/v1/fill/w_894,h_894,q_70,strp/nagumo_from_sakamoto_days__by_nivet2006_dffxj6r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzExMmZkZGE0LTM3MzItNDI1MC04ZTZkLWFmOTgzYWVhMTUyOFwvZGZmeGo2ci0zNDMyZmM1ZC0xNWZlLTRiMmMtOGNmOC0xMDdiZWUzNDYzOGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HD4Kqgp9Nu6Wg-rvnV1F774i0pw5cBJ1c3HA0EEJE8w",
    fallback: "F1",
  },
  {
    name: "friend 2",
    avatar: "",
    fallback: "F2",
  },
  {
    name: "friend 3",
    avatar: "",
    fallback: "F3",
  },
  {
    name: "friend 4",
    avatar: "",
    fallback: "F4",
  },
  {
    name: "friend 5",
    avatar: "",
    fallback: "F5",
  },
  {
    name: "friend 1",
    avatar:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/112fdda4-3732-4250-8e6d-af983aea1528/dffxj6r-3432fc5d-15fe-4b2c-8cf8-107bee34638a.jpg/v1/fill/w_894,h_894,q_70,strp/nagumo_from_sakamoto_days__by_nivet2006_dffxj6r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzExMmZkZGE0LTM3MzItNDI1MC04ZTZkLWFmOTgzYWVhMTUyOFwvZGZmeGo2ci0zNDMyZmM1ZC0xNWZlLTRiMmMtOGNmOC0xMDdiZWUzNDYzOGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HD4Kqgp9Nu6Wg-rvnV1F774i0pw5cBJ1c3HA0EEJE8w",
    fallback: "F1",
  },
  {
    name: "friend 2",
    avatar: "",
    fallback: "F2",
  },
  {
    name: "friend 3",
    avatar: "",
    fallback: "F3",
  },
  {
    name: "friend 4",
    avatar: "",
    fallback: "F4",
  },
  {
    name: "friend 5",
    avatar: "",
    fallback: "F5",
  },
];

type DataPosting = {
  users: {
    id: string;
    username: string;
    avatar_url: string;
    fallback: string;
  };
  image: string;
  like: number;
  comment: number;
  caption: string;
  date: string;
};

const dataPosting: DataPosting[] = [
  {
    users: {
      id: "1",
      username: "yoichinagumo",
      avatar_url:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/112fdda4-3732-4250-8e6d-af983aea1528/dffxj6r-3432fc5d-15fe-4b2c-8cf8-107bee34638a.jpg/v1/fill/w_894,h_894,q_70,strp/nagumo_from_sakamoto_days__by_nivet2006_dffxj6r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzExMmZkZGE0LTM3MzItNDI1MC04ZTZkLWFmOTgzYWVhMTUyOFwvZGZmeGo2ci0zNDMyZmM1ZC0xNWZlLTRiMmMtOGNmOC0xMDdiZWUzNDYzOGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HD4Kqgp9Nu6Wg-rvnV1F774i0pw5cBJ1c3HA0EEJE8w",
      fallback: "YN",
    },
    image:
      "https://i.pinimg.com/736x/d1/0e/4d/d10e4d9febb1bb3c44263c3b27065028.jpg",
    like: 999,
    comment: 999,
    caption:
      "Yoichi Nagumo (南ナηグ モ与bi市イ チ Nagumo Yoichi?) adalah karakter pendukung utama di Sakamoto Days dan seorang teman lama Taro Sakamoto dan terlambat Rion Akao. Dia pertama kali terlihat berkunjung ke Sakamoto untuk memberi tahu dia tentang hadiahnya dan diturunkan menjadi anggota Memesan sebelum kehilangan kursinya selama Pameran Assassin of the Century Arc. Nagumo adalah pria tampan dari rambut hitam tinggi dan ramping, panjang sedang dan mata hitam besar. Dia mengenakan kemeja polo merah dengan pola berbentuk segitiga hitam dan putih di bawah mantel parit berwarna krem (di manga, kemeja itu berwarna putih dengan pola merah dan biru tua, sementara kemeja berwarna biru muda dan mantel berwarna coklat di manga berwarna digital) serta celana biru tua (hitam di manga berwarna digital) dan sepatu hitam.",
    date: "",
  },
  {
    users: {
      id: "2",
      username: "yoichinagumo",
      avatar_url:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/112fdda4-3732-4250-8e6d-af983aea1528/dffxj6r-3432fc5d-15fe-4b2c-8cf8-107bee34638a.jpg/v1/fill/w_894,h_894,q_70,strp/nagumo_from_sakamoto_days__by_nivet2006_dffxj6r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzExMmZkZGE0LTM3MzItNDI1MC04ZTZkLWFmOTgzYWVhMTUyOFwvZGZmeGo2ci0zNDMyZmM1ZC0xNWZlLTRiMmMtOGNmOC0xMDdiZWUzNDYzOGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HD4Kqgp9Nu6Wg-rvnV1F774i0pw5cBJ1c3HA0EEJE8w",
      fallback: "YN",
    },
    image:
      "https://i.pinimg.com/736x/d1/0e/4d/d10e4d9febb1bb3c44263c3b27065028.jpg",
    like: 999,
    comment: 999,
    caption:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque commodi sit error quia, voluptatem quaerat magnam aperiam quis iure, accusamus blanditiis tempore necessitatibus ex numquam ut nam non laboriosam incidunt, minus dignissimos illo dicta rerum.",
    date: "",
  },
];

export default function Home() {
  return (
    <LayoutSidebar>
      <div className="flex justify-center shrink-0 ease-linear">
        <div className="w-[468px]">
          <header className="flex gap-4 p-2 overflow-x-auto scroll-nav-friends">
            <RenderList
              of={dataFriend}
              render={(item: DataFriend, index) => (
                <AvatarFriend key={index} {...item} />
              )}
            />
          </header>
          <main className="flex flex-col mt-[1px]">
            <RenderList
              of={dataPosting}
              render={(item: DataPosting, index) => (
                <Posting key={index} {...item} />
              )}
            />
          </main>
        </div>
      </div>
    </LayoutSidebar>
  );
}
