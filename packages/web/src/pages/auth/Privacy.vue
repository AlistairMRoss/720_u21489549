<template>
    <div class="privacy-policy">
      <span @click="goBack" class="pointer">
        <i class="bi bi-chevron-left" /> Back
      </span> 
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> [Date]</p>
      
      <h2>Introduction</h2>
      <p>Regiu is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
      
      <h2>1. Information We Collect</h2>
      <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
      
      <h3>Personal Data</h3>
      <ul>
        <li>Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or our services, or when you choose to participate in various activities related to the Site and our services.</li>
      </ul>
      
      <h3>Derivative Data</h3>
      <ul>
        <li>Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
      </ul>
      
      <h3>Financial Data</h3>
      <ul>
        <li>Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
      </ul>
      
      <h2>2. Use of Your Information</h2>
      <p>We use the information we collect about you or that you provide to us, including any personal information, for the following purposes:</p>
      <ul>
        <li>To provide, operate, and maintain our website and services</li>
        <li>To improve, personalize, and expand our website and services</li>
        <li>To understand and analyze how you use our website and services</li>
        <li>To develop new products, services, features, and functionality</li>
        <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
        <li>To process your transactions and manage your orders</li>
        <li>To send you text messages and push notifications</li>
        <li>To find and prevent fraud</li>
        <li>For compliance with legal obligations</li>
      </ul>
      
      <h2>3. Disclosure of Your Information</h2>
      <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
      
      <h3>By Law or to Protect Rights</h3>
      <ul>
        <li>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
      </ul>
      
      <h3>Third-Party Service Providers</h3>
      <ul>
        <li>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
      </ul>
      
      <h2>4. Security of Your Information</h2>
      <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
      
      <h2>5. Policy for Children</h2>
      <p>We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.</p>
      
      <h2>6. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
    </div>
  </template>

<script lang="ts">
    export default {
    name: 'PrivacyPolicy',
    methods: {
        goBack() {
            this.$router.push('/login')
        }
    }
    }
</script>

<style scoped>
.privacy-policy {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 800px;
  margin: 20px auto;
}

.privacy-policy h1, 
.privacy-policy h2, 
.privacy-policy h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.privacy-policy p {
  margin-bottom: 10px;
}

.privacy-policy ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 10px;
}
</style>