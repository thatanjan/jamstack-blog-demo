import useSWR from 'swr'

const fetcher = async (url) => {
	const { data } = await axios.get(url)
	return data
}

const useApiSWR = (url) => useSWR(url, fetcher)

export default useApiSWR
