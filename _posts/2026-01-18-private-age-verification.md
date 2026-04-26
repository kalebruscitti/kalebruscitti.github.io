---
layout: post
title: A Proposal for Privacy-Respecting Age Verification
abstract: My proposal for how governments can implement age restrictions on social media without annihilating our privacy.
---

Legislatures around the world have recently been discussing laws restricting access to social media for children. At the end of 2025, [Australia began requiring that social-media platforms implement age-verification processes](https://www.bbc.com/news/articles/cpqye2yygl4o) to prevent those under 16 from using their services. This has sparked similar proposals in [the United States](https://www.commerce.senate.gov/2026/1/chairman-cruz-kosma-meets-parents-where-they-re-at-protects-kids-online) and [Britain](https://www.bbc.com/news/articles/c2k9z535e08o), as well as several EU members.

I haven't come to a decision on whether I support preventing children from using social media in the abstract. However I think the existing proposals are terrible! They are terrible from a personal privacy perspective, and they are also terrible as regulatory barriers that favour large incumbents in the social media market.

Banning children from your service means you have to identify which users are children. The Australian implementation gives companies essentially three options to verify the age of account holders:

> To verify age, platforms can either request copies of identification documents, use a third party to apply age estimation technology to an account holder’s face, or make inferences from data already available, such has how long an account has been held.
> (from [Al Jazeera](https://www.aljazeera.com/news/2026/1/16/australia-declares-child-social-media-ban-victory-as-4-7m-accounts-closed))

The first two options require me to submit a photo of my ID or face to the social media platform or a third party, and just *trust* that they are deleting it after verifying me. [We've already seen how that can go badly.](https://www.bbc.com/news/articles/ce87rer52k3o) Not only is this a privacy nightmare, I can already imagine the kind of identity theft that it enables. Just spin up a phishing website modeled after YouTube's age verification page and start emailing people.

From the companies' perspective, these options are costly. Either pay a third-party fee for the service, or spin up your own infrastructure to securely handle and analyze user-submitted IDs. If you're trying to launch a new social media service, this adds a lot of legal compliance costs that you need to pay. On the other hand, incumbents like Google and Meta are probably happy for the excuse to collect more user data, and can afford it easily.

The third option requires more data than many platforms have, and isn't even accurate when you have the data. [YouTube's rollout ](https://blog.youtube/news-and-events/extending-our-built-in-protections-to-more-teens-on-youtube/) has seen plenty of children flagged as adults and adults flagged for age verification. Age verification that falls back to options 1 and 2.

However, if you're a proponent of a social media ban for children, you need not compromise on privacy and market efficiency! There is a better way.

Imagine instead that your driver's license or other ID had an "age verification code" on it. To age verify with a social media service, all you have to do is submit the code.

In the backend, the company would then use your code to submit a request to the government, asking "Is this user over 18?" and receiving only the reply "Yes" or "No". They don't find out any other information about you, not even your actual age.

Better yet, using cryptography this can be done in such a way that the government doesn't even know who the company is asking about. The companies' request is encrypted, so the only thing the government learns is "Company A submitted an age verification request to our server".

We have the technology to do this! It would be much more private for the users, much easier and cheaper for the tech companies, and only requires a bit of infrastructure set-up from the government.

The rest of this article will try to explain, at a high level, how this could be achieved.

## Hashes and Homomorphic Encryption
There are two bits of cryptographic technology that enable my proposed age verification scheme: hash functions and homomorphic encryption.

A hash function takes some information and turns it into a bunch of random-looking letters and numbers. For example, if I apply the MD5 hash function to the text "ginger", I get `6f4ec514eee84cc58c8e610a0c87d7a2`.

The output is totally unrelated to the input: If I change one letter and input "gimger", I get
`caadae181055ec2502abfb4cc3941a19`, which is completely different from before.

The important property of hash functions is that even if you know the output (the *hash*), you cannot determine what the input was, but if you know the input, you can always compute the output. This is why most websites don't store your password, they store a hash of the password. When you log-in again later, the website can compute the hash of your input password and compare it to the hash they have stored. However if a hacker gets access to the website's password database, they only learn the hash of your password, and can't find out the password itself [^1].

Less well known is homomorphic encryption (HE). This refers to encryption schemes where we can perform computations on the encrypted data. For the mathematician readers, the decryption operation is a ring homomorphism[^2].

Let me explain what that means. Normally, if you encrypt something, the result is a random-looking series of numbers. If you try to add or subtract or do other computations with those numbers, it is totally meaningless. With homomorphic encryption, you can do computations with the encrypted numbers, and when you decrypt the result, it will be exactly the same answer as if you had performed the computation with with original unencrypted data.

The relevant application of HE to our proposal is Private Information Retrieval. This means someone can set up a public database, and enable their clients to use HE to "retrieve records from public databases while completely hiding the identity of the retrieved records from
database owners" ([Microsoft Research](https://www.microsoft.com/en-us/research/publication/private-information-retrieval/)). A Private Information Retrieval system powered by HE is [already implemented in Google Chrome](https://support.google.com/chrome/answer/10311524?hl=en#zippy=%2Chow-password-protection-works), which uses it to compare your stored passwords to public databases of known leaked passwords.

## Private Age Verification

With these tools at hand, I can describe a system for private age verification. First, the government will need to set up a public database of all citizens who are over 18. However, this database would not contain any information about the citizens; obviously that would be a horrible privacy violation. Instead, some combination of your name, date of birth and other information like maybe a social insurance number, would be put into a hash function and turned into a random string of characters. This string of characters would be your "age verification code" and printed onto your government ID.

Then the government would set up a database containing the age verification codes of all citizens over 18. The database has no other information available, not even your age. Your code's presence in the database is enough to signify that you are above 18 (or it could be 16, 13, whatever the proposed social media ban requires.) This database would have a Private Information Retrieval service enabled, that tech companies could query.

With this database set up, the rest is simple. When a company requires you to age verify, you give them the age verification code from your ID. They encrypt this code and query the government database. If you're in the database, then you're of age. If you're not, then the company bans you from their platform.

Let's recap what everyone learns about you in this scenario:
- The company learns your age verification code, and nothing else.
- The government learns that the company made a verification request, but not for who, and nothing else.

Moreover, this solution is much simpler for the companies to implement. No more having to process photos with image recognition technology or apply AI onto your user data. No paying fees to a third-party verification service. Just one simple query to a server and it's done.

Also, you probably need to mandate that companies must accept this as a form of age verification. I imagine that Google would rather force me to send them a picture of my face, even if a verification database was available.
## Potential Limitations

While I think this proposal is better than the status quo in every way, it is not without flaws. Here are the ones I can think of.

Firstly, you have to trust companies with your age verification code. If you give your code to Instagram and then also give them your name, they can now attach the name to the code. They might sell that information to data brokers, and over time tech companies might be able to associate all your information to your code. Another risk is that if companies compare age verification codes of their users, they can use it to link your accounts across various services, even if you're careful to avoid giving them other data. The code is basically a government-backed fingerprint they can use to track you. At least it is a fingerprint you have to opt-in to providing to services, instead of one they automatically collect from your device.

Secondly, the government has to pay to set up and maintain this database. The upfront work is probably significant, though I would expect the maintenance to be fairly simple. You could charge companies a small fee (like 1 cent or something) every time they query the database, and this could cover the maintenance cost. In any case, I think this would be a better use of tax dollars than many other projects, plus it creates cushy government IT jobs. Win-win.

Thirdly, there is nothing preventing children from stealing a code from their parents and using that to verify. While this is true, it doesn't seem any easier than the [myriad of methods](https://metro.co.uk/2026/01/15/teens-outsmarting-australias-social-media-ban-wrinkling-faces-look-older-26306429/) that teens have already found to bypass Australia's age verification law.


In conclusion: If we're going to do age verification mandates for social media, can we at least make use of modern technology to do them properly?

Let me know what you think, and if you liked my proposal consider sharing it with others.



[^1]: [If your password is sufficiently secure](https://www.reddit.com/r/cybersecurity/comments/ux4qjh/if_md5_password_hashes_are_stolen_can_the/).

[^2]: You might have expected instead that the encryption operation is a ring homomorphism, hence "homomorphic encryption".  Although you will see this written colloquially in the literature, it is not equivalent. Requiring the decryption to be a ring homomorphism however is equivalent to the more usual definitions of HE.



