<script setup>
import {ref} from "vue";
import {Carousel} from "primevue";

const activities = [
    {
        url: "/ysp/images/about/iaysp_cleanup.png",
        title: "IAYSP Cleanup",
    },
    {
        url: "/ysp/images/about/service_proj.png",
        title: "Service Project",
    },
    {
        url: "/ysp/images/about/ysp_moldova.png",
        title: "YSP Moldova",
    },
    {
        url: "/ysp/images/about/interfaith.png",
        title: "Interfaith Workshop",
    },
];
const carouselResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);

const openIAYSPWebsite = () => {
    window.open('https://iaysp.org/', '_blank');
};
</script>

<template>
    <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
        <div class="grid grid-cols-12 gap-8" style="text-align: justify;">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Wer sind wir?</div>
            </div>

            <div class="col-span-12 ">
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    YSP steht für Youth and Students for Peace – Jugend und Studenten für den Frieden.
                </p>
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                Wir glauben daran, dass jeder von uns das Potenzial und die Kraft hat, einen Unterschied in der Welt zu machen und etwas Einzigartiges für diese Welt beizutragen. Frieden beginnt mit uns selbst und in unserem Umfeld und schon mit kleinen Aktionen können wir gemeinsam an einer besseren Welt arbeiten.
                </p>
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    Wir möchten jungen Menschen die Hoffnung und die Vision für eine hellere und friedliche Zukunft geben und in ihnen das Gefühl und die Sicherheit wecken, dass diese Zukunft durch unseren Beitrag eine Realität werden kann. Dazu schaffen einen Ort, an dem junge Menschen praktisch mit anpacken, Dinge ausprobieren, sich miteinander austauschen und erleben, wie viel Energie und Freude es bringt, etwas zusammen zu tun – auch wenn es nur kleine Schritte sind.
                </p>
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    Unsere Arbeit beruht auf den folgenden zwei Säulen.
                </p>
            </div>

            <div
                class="col-span-12 md:col-span-6 mt-10 md:my-10 p-2 md:p-12"
                style="border-radius: 20px; background: linear-gradient(0deg, #e4c454, #FFDE59), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #efe1af 0%, #c3dcfa 100%)">
                <div class="flex flex-col justify-center items-center text-center px-4 py-4 md:py-0">
                    <div class="text-gray-900 mb-2 text-4xl font-semibold mb-5">Service</div>
                    <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-6" style="max-width: 800px">
                        Als Gemeinschaft führen wir zusammen Service-Projekte durch – an den Orten in unserer Umgebung, an denen wir praktisch etwas beitragen können. Durch Taten erleben wir an der eigenen Haut, was es bedeutet und wie sinnvoll es ist, etwas für andere Menschen zu tun und für sie da zu sein.
                    </p>
                </div>
            </div>

            <div
                class="col-span-12 md:col-span-6 mb-10 md:my-10 p-2 md:p-12"
                style="border-radius: 20px; background: linear-gradient(0deg, rgb(143,232,99), rgb(193,255,114)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #efe1af 0%, #c3dcfa 100%)">
                <div class="flex flex-col justify-center items-center text-center px-4 py-4 md:py-0">
                    <div class="text-gray-900 mb-2 text-4xl font-semibold mb-5">Austausch</div>
                    <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-6" style="max-width: 800px">
                        Bei unseren Aktionen treffen wir andere junge Leute, teilen Erfahrungen und lernen voneinander. So entstehen neue Perspektiven, Verständnis füreinander und die Freude an gemeinsamen Erlebnissen.
                    </p>
                </div>
            </div>

            <div class="col-span-12 ">
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    YSP ist offen für alle Kulturen, Religionen und Hintergründe – verbunden durch den Wunsch, zusammen aktiv zu sein, etwas Sinnvolles zu tun, echte Erfahrungen zu sammeln und etwas für den Frieden beizutragen.
                </p>
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    Fühlst du dich angesprochen?
                    Willst du praktisch etwas beitragen und dabei gemeinsam lernen, wachsen und erleben?
                    Dann bist du bei uns genau richtig.
                    Sei dabei – wir freuen uns auf dich! 🙂
                </p>
            </div>

            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Wo kommen wir her?</div>
            </div>

            <div class="col-span-12 ">
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    YSP Deutschland ist ein Zweig der weltweiten Organisation IAYSP – International Association of Youth and Students for Peace.
                </p>
                <div class="text-center">
                    <Button class="w-100" label="IAYSP Website Besuchen" icon="pi pi-globe" @click="openIAYSPWebsite" />
                </div>
            </div>

            <div class="col-span-12 text-center mt-6 mb-3">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Gründerin</div>
            </div>

            <div class="col-span-12 ">
                <img src="/ysp/images/about/han_hak_ja.png" alt="Han Hak Ja" class="col-span-4 rounded float-left w-full md:w-auto md:me-5 mb-5">
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    IAYSP wurde 2017 von Dr. Hak Ja Han Moon in Südkorea gegründet. Zusammen mit ihrem Ehemann Sun Myung Moon (1920 – 2012) hat sie ihr ganzes Leben dem Frieden gewidmet und zahlreiche Projekte gestartet, um Menschen aus den verschiedensten Bereichen – der Politik, der Religion, der Medien, der Kunst, des Sportes etc. – zusammenzubringen, um gemeinsam für den Frieden zu wirken.                </p>
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    Mit der Gründung von IAYSP verfolgt sie die Vision, junge Menschen aus der ganzen Welt zu bekräftigen, um gemeinsam für den Frieden zu arbeiten und Hoffnung für die Welt zu sein.                </p>
                <p class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-2xl">
                    Als YSP Deutschland teilen wir diese Vision, genauso wie die 48 anderen Länder auf der Welt, in denen YSP aktiv ist.
                </p>
            </div>

            <div class="col-span-12 ">
                <Carousel :value="activities" :numVisible="3" :numScroll="3" :responsiveOptions="carouselResponsiveOptions" style="margin-inline: -47px;">
                <template #item="activity">
                    <div class="border bg-surface-0 dark:bg-surface-900 h-ful rounded m-2 p-4">
                        <div class="mb-4">
                            <div class="relative mx-autol">
                                <Image :src="activity.data.url" alt="activity" class="w-full rounded" preview/>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="mt-0 font-semibold text-xl">{{ activity.data.title }}</div>
                        </div>
                    </div>
                </template>
                </Carousel>
            </div>

        </div>
    </div>
</template>
