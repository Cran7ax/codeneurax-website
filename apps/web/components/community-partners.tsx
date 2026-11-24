import Image from "next/image"

const associations = [
	{
		name: "Marwadi University",
		label: "Institutional association",
		logo: "/partners/marwadi-university.png",
	},
	{
		name: "TensorTurn",
		label: "Technology partner",
		logo: "/partners/tensorturn.jpg",
	},
]

export function CommunityPartners() {
	return (
		<section
			id="community-partners"
			aria-labelledby="community-partners-title"
			className="border-t border-[#E5E5E5] bg-[#F4F4F0] py-14 sm:py-16"
		>
			<div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
				<header className="mb-8 max-w-2xl">
					<p className="text-sm text-[#606060]">Community connections</p>
					<h2
						id="community-partners-title"
						className="mt-2 font-display text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl"
					>
						Institutions and organizations
					</h2>
				</header>
				<div className="grid grid-cols-1 border-y border-[#E5E5E5] sm:grid-cols-2">
					{associations.map((association, index) => (
						<div
							key={association.name}
							className={`flex min-h-32 items-center justify-between gap-6 py-6 ${
								index === 0
									? "border-b border-[#E5E5E5] sm:border-b-0 sm:border-r"
									: ""
							} sm:px-8 first:pl-0 last:pr-0`}
						>
							<div className="relative h-14 w-44 sm:w-52">
								<Image
									src={association.logo}
									alt={association.name}
									fill
									sizes="208px"
									className="object-contain object-left"
								/>
							</div>
							<p className="max-w-24 text-right text-xs leading-relaxed text-[#606060]">
								{association.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
