

export default function User({ user }) {
    const { avatar_url, followers, following, public_repos, name, login, url, created_at } = user;

    const createdData = new Date(created_at);
    return (
        <div className="flex flex-col items-center py-3">
            <div className="mb-4">
                <img className="object-fill w-full h-full rounded-lg" src={avatar_url} alt="user" />
            </div>
            <div className="text-center text-2xl font-semibold mb-3">
                <a className="font-bold text-blue-500 underline" href={`https://github.com/${login}`}>{name || login}</a>
                <p>User joined on <span className="text-blue-600 font-bold">{`${createdData.getDate()} ${createdData.toLocaleString('en-us', {
                    month: 'short',
                })} ${createdData.getFullYear()}`}</span></p>
            </div>
            <div className="flex justify-around w-full font-semibold my-4">
                <div className="text-center">
                    <p className="font-bold text-2xl">Public Repos</p>
                    <p className="text-xl">{public_repos}</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-2xl">Profile_Url</p>
                    <p className="text-xl underline">{url}</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-2xl">Followers</p>
                    <p className="text-xl">{followers}</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-2xl">Following</p>
                    <p className="text-xl">{following}</p>
                </div>
            </div>
        </div>
    )
}