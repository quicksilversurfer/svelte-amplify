<script>
  // State for mobile menu visibility
  let isMenuOpen = $state(false);

  // Images array for easier management
  const images = [
    {
      src: "https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Business meeting",
    },
    {
      src: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Team collaboration",
    },
    {
      src: "https://images.unsplash.com/photo-1626225015999-2e53f6aaa008?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Office work",
    },
    {
      src: "https://images.unsplash.com/photo-1729027696167-0f3aa8e92e64?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Team meeting",
    },
    {
      src: "https://images.unsplash.com/photo-1677785643764-179393bc3842?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Office culture",
    },
  ];

  // Import transitions
  import { slide, fade } from "svelte/transition";

  // Handle mobile menu toggle
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  // Navigation items for DRY code
  const navItems = [
    { href: "#", text: "Product" },
    { href: "#", text: "Features" },
    { href: "#", text: "Marketplace" },
    { href: "#", text: "Company" },
  ];
</script>

<div class="bg-white">
  <header class="absolute inset-x-0 top-0 z-50">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <!-- Logo -->
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="/logo.svg" alt="Company logo" />
        </a>
      </div>

      <!-- Mobile menu button -->
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onclick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span class="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            class="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d={isMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
            />
          </svg>
        </button>
      </div>

      <!-- Desktop navigation -->
      <div class="hidden lg:flex lg:gap-x-12">
        {#each navItems as { href, text }}
          <a
            {href}
            class="text-sm/6 font-semibold text-gray-900 hover:text-gray-600 transition-colors"
            >{text}</a
          >
        {/each}
      </div>

      <!-- Desktop login -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a
          href="#"
          class="text-sm/6 font-semibold text-gray-900 hover:text-gray-600 transition-colors"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>

    <!-- Mobile menu -->
    {#if isMenuOpen}
      <div
        class="lg:hidden"
        role="dialog"
        aria-modal="true"
        transition:slide
        id="mobile-menu"
      >
        <div
          class="fixed inset-0 z-50 bg-black bg-opacity-25"
          transition:fade
        ></div>
        <div
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          transition:slide={{ axis: "x" }}
        >
          <!-- Mobile menu content -->
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="/logo.svg" alt="Company logo" />
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              onclick={toggleMenu}
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Mobile navigation items -->
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                {#each navItems as { href, text }}
                  <a
                    {href}
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    {text}
                  </a>
                {/each}
              </div>
              <div class="py-6">
                <a
                  href="#"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </header>

  <main>
    <div class="relative isolate">
      <!-- Background pattern SVG -->
      <svg
        class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
        />
      </svg>

      <div class="overflow-hidden">
        <div
          class="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32"
        >
          <div
            class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center"
          >
            <!-- Hero content -->
            <div class="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1
                class="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl"
                transition:fade
              >
                We're changing the way people connect
              </h1>
              <p
                class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none"
                transition:fade={{ delay: 200 }}
              >
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div
                class="mt-10 flex items-center gap-x-6"
                transition:fade={{ delay: 400 }}
              >
                <a
                  href="#"
                  class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                >
                  Get started
                </a>
                <a
                  href="#"
                  class="text-sm/6 font-semibold text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Live demo <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <!-- Image grid -->
            <div
              class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
            >
              <!-- Image columns -->
              {#each [images.slice(0, 1), images.slice(1, 3), images.slice(3, 5)] as column, i}
                <div
                  class={`
                  w-44 flex-none space-y-8
                  ${i === 0 ? "ml-auto pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80" : ""}
                  ${i === 1 ? "mr-auto sm:mr-0 sm:pt-52 lg:pt-36" : ""}
                  ${i === 2 ? "pt-32 sm:pt-0" : ""}
                `}
                >
                  {#each column as { src, alt }}
                    <div class="relative" transition:fade>
                      <img
                        {src}
                        {alt}
                        class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        loading="lazy"
                      />
                      <div
                        class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"
                      ></div>
                    </div>
                  {/each}
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
