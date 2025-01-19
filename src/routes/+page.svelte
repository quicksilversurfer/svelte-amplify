<script>
  import Todo from "$lib/components/Todo.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Timeline from "$lib/components/Timeline.svelte";
  import Content from "$lib/components/Content.svelte";
  import Calendar from "$lib/components/Calendar.svelte";

  const timelineEvents = [
    {
      text: "Step 1",
      title: "Book a slot",
      description:
        "Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.",
    },
    {
      text: "Step 2",
      title: "Wait for matching",
      description:
        "Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.",
    },
    {
      text: "Step 3",
      title: "Get matched!",
      description:
        "Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.",
    },
    {
      text: "Step 4",
      title: "Play",
      description:
        "Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.",
    },
  ];
</script>

<Hero />
<Timeline items={timelineEvents} />
<Calendar />
<FAQ />
<Footer />
